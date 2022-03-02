import AbortController from 'abort-controller';
import { LogService } from '..';
import { AbortedError } from '../../util/aborted-error';
import { TargetMatch, TargetNames } from '../../util/find-target.types';
import { controlF5, typeKeyboard } from '../../util/keyboard';
import { clickTarget } from '../../util/mouse';
import { getTime, sleep } from '../../util/time';
import { Action, Browser, GameLoop } from '../game-api';

export class Login extends Action {
    name = 'login';
    async start(browser: Browser, abortController?: AbortController): Promise<void> {
        this.controller = abortController ? abortController : new AbortController();

        await new Promise(async (resolve, reject) => {
            this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
            try {
                this.browser = browser;
                this.threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

                await LogService.registerLog('Verificando se esta desconectado do jogo', {}, browser.account);

                await this.checkAccept();
                await this.checkLoginAttempls();

                const clickWallet = await clickTarget({
                    target: TargetNames.CONNECT_WALLET,
                    threshold: this.threshold,
                    abortController: this.controller,
                });

                if (!clickWallet) {
                    resolve(false);
                    return;
                }

                await LogService.registerLog('Botão conectar carteira foi detectado', {}, browser.account);
                browser.loginAttempts = browser.loginAttempts + 1;

                const clickSign = await this.clickLogin();

                if (!clickSign) {
                    await LogService.registerLog('Não conseguiu fazer login', {}, browser.account);
                    resolve(false);
                    return;
                }

                browser.logged = await this.checkClickTreasuteHut();
                if (browser.logged) {
                    browser.timeActionsPerformed['login'] = getTime();
                } else {
                    await LogService.registerLog('Não conseguiu fazer login', {}, browser.account);
                }
                resolve(true);
            } catch (e) {
                console.log('login:start', e);
                reject(e);
            }
        });
    }

    private async clickLogin() {
        return await new Promise<TargetMatch | boolean>(async (resolve, reject) => {
            this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
            try {
                let clicked: TargetMatch | boolean;
                clicked = await clickTarget({
                    target: TargetNames.INPUT_USERNAME,
                    threshold: 0.9,
                    timeOut: 5,
                    abortController: this.controller,
                });
                if (!clicked) return resolve(false);

                await typeKeyboard(this.browser.account.user);

                clicked = await clickTarget({
                    target: TargetNames.INPUT_PASSWORD,
                    threshold: 0.9,
                    timeOut: 5,
                    abortController: this.controller,
                });
                if (!clicked) return resolve(false);

                await typeKeyboard(this.browser.account.password);

                clicked = await clickTarget({
                    target: TargetNames.LOGIN,
                    threshold: 0.9,
                    abortController: this.controller,
                });

                return resolve(clicked);
            } catch (e) {
                reject(e);
            }
        });
    }
    private async checkAccept() {
        return await new Promise(async (resolve, reject) => {
            this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
            try {
                await LogService.registerLog(
                    'Verificando se precisa aceitar os termos de uso',
                    {},
                    this.browser.account,
                );
                const click = await clickTarget({
                    target: TargetNames.ACCEPT_CHECKBOX,
                    threshold: this.threshold,
                    abortController: this.controller,
                    timeOut: 1,
                });

                if (click) {
                    clickTarget({
                        target: TargetNames.ACCEPT_BUTTON,
                        threshold: this.threshold,
                        abortController: this.controller,
                    });
                }
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }

    private async checkClickTreasuteHut() {
        return await new Promise<boolean>(async (resolve, reject) => {
            this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

            try {
                const clickTreasuteHunt = await clickTarget({
                    target: TargetNames.TREASURE_HUNT,
                    threshold: this.threshold,
                    timeOut: 30,
                });

                if (clickTreasuteHunt) {
                    this.browser.loginAttempts = 0;
                    await LogService.registerLog('Colocando heróis para trabalhar', {}, this.browser.account);
                }
                return resolve(Boolean(clickTreasuteHunt));
            } catch (e) {
                console.log(e, 'login:checkClickTreasuteHut');
                reject(e);
            }
        });
    }

    private async checkLoginAttempls() {
        return await new Promise(async (resolve, reject) => {
            this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

            try {
                if (this.browser.loginAttempts == undefined) {
                    this.browser.loginAttempts = 0;
                }
                if (this.browser.loginAttempts > 3) {
                    this.browser.loginAttempts = 0;
                    await LogService.registerLog('Forçando recarregamento da pagina', {}, this.browser.account);
                    controlF5();
                    await sleep(15000);
                }
                resolve(true);
            } catch (e) {
                console.log(e, 'login:checkLoginAttempls');
                reject(e);
            }
        });
    }
}
