import AbortController from 'abort-controller';
import { BrowserWindow, ipcMain } from 'electron';
import { AccountService } from '.';
import Config from '../database/models/config.model';
import { AbortedError } from '../util/aborted-error';
import { TargetNames } from '../util/find-target.types';
import { clickCenterWindow, clickTarget } from '../util/mouse';
import { getTime, sleep, timeToMinutes } from '../util/time';
import { createWindowBomb } from '../util/window';
import configService from './config.service';
import { EVENT_GAME_LOOP_BROWSER, EVENT_GAME_LOOP_STATUS, EVENT_GAME_LOOP_STATUS_PAUSED } from './events.types';
import gameActionService from './game-action.service';
import { ActionsConfig, ActionsStartConfig, Browser } from './game-loop.types';
import logService from './log.service';

export class GameLoop {
    static instance: GameLoop;

    public browserActive: BrowserWindow;
    public config: Config[];
    public actions: ActionsConfig[];
    public actionsStart: ActionsStartConfig[];
    public browsers: Browser[];
    public controller: AbortController;

    public execute: boolean = false;
    public isPaused: boolean = null;

    windowName = 'Bombcrypto';

    constructor() {}

    static getInstance() {
        if (GameLoop.instance) return GameLoop.instance;

        GameLoop.instance = new GameLoop();
        return GameLoop.instance;
    }

    async start() {
        this.controller = new AbortController();

        try {
            await new Promise(async (resolve, reject) => {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
                if (this.execute) {
                    logService.registerLog('O bot já esta sendo executando', {});
                    return resolve(true);
                }

                this.setExecute(true);
                this.setPaused(null);
                await this.initActions();
                await this.getConfig();
                await this.getBrowsers();
                this.setPaused(false);

                await sleep(10000, { abortControler: this.controller });

                if (!this.browsers || this.browsers.length == 0) {
                    resolve(false);
                    return;
                }

                await this.execActionsStart();
                await this.loop();
                // await this.stop(false);
                resolve(true);
            });
        } catch (e) {
            console.log(e, 'Error GameLoop:start');
            if (e.name == AbortedError.name) {
                return false;
            }

            await logService.registerLog('Ocorreu algum erro: {{error}}', { error: JSON.stringify(e) });
            await this.stop();
        }
    }

    async stop(message = true) {
        try {
            this.setExecute(false);
            ipcMain.emit(EVENT_GAME_LOOP_BROWSER, 0);

            if (message) {
                await logService.registerLog('Bot encerrado');
            }

            this.browsers.map((browser) => browser.browser.close());

            await this.abortAllActions();
            this.browsers = [];
        } catch (e) {
            if (e.name == AbortedError.name) {
                return false;
            }
        }
        // delete GameLoop.instance;
    }

    async pause() {
        try {
            if (this.isPaused === null) return false;
            this.setPaused(true);
            await this.abortAllActions();

            await logService.registerLog('Bot pausado');
        } catch (e) {
            if (e.name == AbortedError.name) {
                return false;
            }
            console.log('game-loop:pause', e);
        }
    }
    async continue() {
        try {
            this.controller = new AbortController();
            this.setPaused(false);
            await logService.registerLog('Bot iniciado');
            if (!(await this.checkLoggedAllBrowsers())) {
                await this.execActionsStart();
            }
            await this.resetPositions();
            await this.loop();
        } catch (e) {
            if (e.name == AbortedError.name) {
                return false;
            }
            console.log(e, 'Error GameLoop:continue');
            await logService.registerLog('Ocorreu algum erro: {{error}}', { error: JSON.stringify(e) });
            await this.stop();
        }
    }

    private async abortAllActions() {
        this.actionsStart.forEach((action) => {
            action.action.stop();
        });
        this.actions.forEach((action) => {
            action.action.stop();
        });
        this.controller.abort();
    }

    private async resetPositions() {
        for (const browser of this.browsers) {
            try {
                await this.showBrowser(browser);

                await clickTarget({ target: TargetNames.X, threshold: 0.7 });
                await clickTarget({ target: TargetNames.GO_BACK_ARROW, threshold: 0.7 });
                await sleep(500);
            } catch (e) {}
        }
    }

    private async showBrowser({ browser }: Browser) {
        this.browserActive = browser;

        if (!browser.isFocused() || !browser.isVisible()) {
            browser.focus();
            browser.setAlwaysOnTop(true);
            browser.setAlwaysOnTop(false);
            await sleep(500);
            await clickCenterWindow(browser);
            await sleep(500);
        }
    }
    setExecute(value: boolean) {
        this.execute = value;
        ipcMain.emit(EVENT_GAME_LOOP_STATUS, value);
    }
    setPaused(value: boolean) {
        this.isPaused = value;
        ipcMain.emit(EVENT_GAME_LOOP_STATUS_PAUSED, value);
    }

    private async execActionsStart() {
        return new Promise(async (resolve, reject) => {
            this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
            try {
                for (let browser of this.browsers) {
                    for (let action of this.actionsStart) {
                        try {
                            await this.showBrowser(browser);

                            await action.action.start(browser, this.controller);
                            await sleep(500);
                        } catch (e) {
                            console.log('execActionsStart', e);
                            if (e.name == AbortedError.name) {
                                return reject(e);
                            }
                            await logService.registerLog('Erro na ação {{action}}', { action: action.name });
                        }
                    }
                }
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }

    private async loop() {
        return new Promise(async (resolve, reject) => {
            this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

            try {
                if (!(await this.checkLoggedAllBrowsers())) {
                    await logService.registerLog('Nenhuma conta está logada no bombcrypto');
                    resolve(false);
                    return;
                }

                while (this.execute && !this.isPaused) {
                    for (let browser of this.browsers) {
                        if ((await this.checkLogged(browser)) == false) return;

                        const currentTime = getTime();

                        for (let action of this.actions) {
                            if (!this.execute) return;
                            const timeCheck = await this.getTimeActionCheck(action);
                            const actionLastPerformed = browser.timeActionsPerformed[action.name] || 0;
                            const lastExecute = timeToMinutes(currentTime - actionLastPerformed);

                            const checkTime = lastExecute >= timeCheck;

                            if (checkTime) {
                                try {
                                    await this.showBrowser(browser);

                                    await action.action.start(browser, this.controller);
                                    await sleep(500);
                                    browser.timeActionsPerformed[action.name] = currentTime;
                                } catch (e) {
                                    console.log('game-loop:loop ', action.name, e);
                                    if (e.name == AbortedError.name) {
                                        return reject(e);
                                    }

                                    browser.timeActionsPerformed[action.name] = currentTime;

                                    await logService.registerLog('Erro na ação {{action}}: {{error}}', {
                                        action: action.name,
                                        error: JSON.stringify(e),
                                    });
                                }
                            }
                        }

                        await sleep(1000);
                    }
                }
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }

    private async getTimeActionCheck(action: ActionsConfig) {
        return action.configTime ? parseInt(await this.getConfigByName(action.configTime, '0')) : 1;
    }

    private async checkLoggedAllBrowsers() {
        const countLogged = this.browsers.filter((browser) => browser.logged).length;
        return Boolean(countLogged);
    }

    private async checkLogged(browser: Browser) {
        if (!browser.logged) {
            await logService.registerLog(
                'Para executar as ações, é necessário o que o BOT consiga estar logado',
                {},
                browser.account,
            );
            return false;
        }
        return true;
    }

    private async initActions() {
        await logService.registerLog('Buscando ações da serem executadas');
        const actions = await gameActionService.getAll({
            order: {
                order: 'ASC',
            },
        });

        this.actions = [];
        this.actionsStart = [];

        for (let action of actions) {
            const { [action.className]: classAction } = await import(`./game-actions/${action.fileName}`);

            if (action.loop) {
                this.actions.push({
                    configTime: action.configTime,
                    lastTime: action.startTime ? getTime() : 0,
                    action: new classAction(),
                    name: action.fileName,
                });
            } else {
                this.actionsStart.push({
                    action: new classAction(),
                    name: action.fileName,
                });
            }
        }
    }

    private async getBrowsers() {
        const accounts = await AccountService.getAllActive();
        await logService.registerLog('Encontrado {{qty}} contas para executar', {
            qty: accounts.length.toString(),
        });
        ipcMain.emit(EVENT_GAME_LOOP_BROWSER, accounts.length);
        this.browsers = [];

        accounts.map(async (account) => {
            this.browsers.push({
                browser: await createWindowBomb(account),
                account,
                logged: false,
                timeActionsPerformed: {},
            });
        });
    }
    public async getConfigByName(name: string, valueDefault: string) {
        if (!this.config) {
            await this.getConfig();
        }

        const config = this.config.find((c) => c.name == name);

        return config.value || valueDefault;
    }
    private async getConfig() {
        await logService.registerLog('Buscando configurações');
        this.config = await configService.getConfigSystem();
    }
}
