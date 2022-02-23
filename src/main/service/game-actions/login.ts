import { LogService } from '..';
import { TargetNames } from '../../util/find-target.types';
import { controlF5, typeKeyboard } from '../../util/keyboard';
import { clickTarget } from '../../util/mouse';
import { sleep } from '../../util/time';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';
export class Login implements GameAction {
    threshold: number;
    browser: Browser;
    async start(browser: Browser): Promise<void> {
        try {
            this.browser = browser;
            this.threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

            await LogService.registerLog('Verificando se esta desconectado do jogo', {}, browser.account);

            await this.checkButtonOk();
            await this.checkAccept();
            await this.checkLoginAttempls();

            const clickWallet = await clickTarget({ target: TargetNames.CONNECT_WALLET, threshold: this.threshold });

            if (!clickWallet) return;

            await LogService.registerLog('Botão conectar carteira foi detectado', {}, browser.account);
            browser.loginAttempts = browser.loginAttempts + 1;

            const clickSign = await this.clickLogin();

            if (!clickSign) {
                await LogService.registerLog('Não conseguiu fazer login', {}, browser.account);
                return;
            }

            await this.checkClickTreasuteHut();
        } catch (e) {
            console.log(e, 'login:start');
            throw e;
        }
    }

    private async clickLogin() {
        let clicked;
        clicked = await clickTarget({
            target: TargetNames.INPUT_USERNAME,
            threshold: 0.9,
            timeOut: 5,
        });
        if (!clicked) return false;

        await typeKeyboard(this.browser.account.user);

        clicked = await clickTarget({
            target: TargetNames.INPUT_PASSWORD,
            threshold: 0.9,
            timeOut: 5,
        });
        if (!clicked) return false;

        await typeKeyboard(this.browser.account.password);

        clicked = await clickTarget({
            target: TargetNames.LOGIN,
            threshold: 0.9,
        });

        return clicked;
    }
    private async checkAccept() {
        await LogService.registerLog('Verificando se precisa aceitar os termos de uso', {}, this.browser.account);
        const click = await clickTarget({
            target: TargetNames.ACCEPT_CHECKBOX,
            threshold: this.threshold,
        });

        if (click) {
            clickTarget({
                target: TargetNames.ACCEPT_BUTTON,
                threshold: this.threshold,
            });
        }
    }

    private async checkClickTreasuteHut() {
        try {
            const clickTreasuteHunt = await clickTarget({
                target: TargetNames.TREASURE_HUNT,
                threshold: this.threshold,
                timeOut: 20,
            });

            if (clickTreasuteHunt) {
                this.browser.loginAttempts = 0;
                await LogService.registerLog('Colocando heróis para trabalhar', {}, this.browser.account);
            }
        } catch (e) {
            console.log(e, 'login:checkClickTreasuteHut');
            throw e;
        }
    }

    private async checkButtonOk() {
        try {
            await LogService.registerLog('Verificando se exibiu mensagem de erro', {}, this.browser.account);
            const exists = await clickTarget({ target: TargetNames.OK, threshold: 0.6 });
            if (exists) {
                await sleep(15000);
            }
        } catch (e) {
            console.log(e, 'login:checkButtonOk');
            throw e;
        }
    }
    private async checkLoginAttempls() {
        try {
            if (this.browser.loginAttempts == undefined) {
                this.browser.loginAttempts = 0;
            }
            if (this.browser.loginAttempts > 3) {
                this.browser.loginAttempts = 0;
                await LogService.registerLog('Forçando recarregamento da pagina', {}, this.browser.account);
                // controlF5();
                // await sleep(15000);
            }
        } catch (e) {
            console.log(e, 'login:checkLoginAttempls');
            throw e;
        }
    }
}
