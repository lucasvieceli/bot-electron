import { BrowserWindow, ipcMain } from 'electron';
import { AccountService } from '.';
import Config from '../database/models/config.model';
import { clickCenterWindow } from '../util/mouse';
import { getTime, sleep, timeToMinutes } from '../util/time';
import { createWindowBomb } from '../util/window';
import configService from './config.service';
import { EVENT_GAME_LOOP_BROWSER, EVENT_GAME_LOOP_STATUS } from './events.types';
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

    public execute: boolean = false;

    windowName = 'Bombcrypto';

    constructor() {}

    static getInstance() {
        if (GameLoop.instance) return GameLoop.instance;

        GameLoop.instance = new GameLoop();
        return GameLoop.instance;
    }

    async start() {
        try {
            if (this.execute) {
                logService.registerLog('O bot já esta sendo executando', {});
                return;
            }

            this.setExecute(true);
            await this.initActions();
            await this.getConfig();
            await this.getBrowsers();
            if (!this.browsers || this.browsers.length == 0) return false;

            await this.execActionsStart();
            await this.loop();
        } catch (e) {
            console.log(e, 'Error GameLoop:start');
            await logService.registerLog('Ocorreu algum erro: {{error}}', { error: JSON.stringify(e) });
            // await logService.registerLog('Bot será reiniciado automáticamente', {});
            await this.stop();
            // await this.start();
        }
    }

    async stop() {
        this.setExecute(false);
        ipcMain.emit(EVENT_GAME_LOOP_BROWSER, 0);

        await logService.registerLog('Bot encerrado');

        this.browsers.map((browser) => browser.browser.close());
        this.browsers = [];

        this.actions.forEach((action) => {
            delete action.action;
        });
        this.actionsStart.forEach((action) => {
            action.action;
        });
        delete GameLoop.instance;
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

    private async execActionsStart() {
        for (let browser of this.browsers) {
            for (let action of this.actionsStart) {
                try {
                    await this.showBrowser(browser);

                    await action.action.start(browser);
                    await sleep(500);
                } catch (e) {
                    await logService.registerLog('Erro na ação {{action}}', { action: action.name });
                }
            }
        }
    }

    private async loop() {
        while (this.execute) {
            for (let browser of this.browsers) {
                if ((await this.checkAccount(browser)) == false) return;

                const currentTime = getTime();

                for (let action of this.actions) {
                    if (!this.execute) return;
                    const timeCheck = await this.getTimeActionCheck(action);
                    const lastExecute = timeToMinutes(currentTime - action.lastTime);
                    const checkTime = lastExecute > timeCheck;

                    if (checkTime) {
                        action.lastTime = currentTime;
                        try {
                            await this.showBrowser(browser);

                            await action.action.start(browser);
                            await sleep(500);
                        } catch (e) {
                            console.log(e, e.message);
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
    }

    private async getTimeActionCheck(action: ActionsConfig) {
        return action.configTime ? parseInt(await this.getConfigByName(action.configTime, '0')) : 1;
    }

    private async checkAccount(browser: Browser) {
        if (!browser.account) {
            await logService.registerLog(
                'Para executar as ações, é necessário o que o BOT consiga pega o ID da metamask. BOT não esta conseguindo abrir a metamask e copiar o id. Reinicie o BOT',
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
                    name: action.name,
                });
            } else {
                this.actionsStart.push({
                    action: new classAction(),
                    name: action.name,
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
            });
        });
        await sleep(10000);
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
