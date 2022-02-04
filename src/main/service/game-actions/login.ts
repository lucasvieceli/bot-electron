import { LogService } from '..';
import { TargetNames } from '../../util/find-target.types';
import { controlF5 } from '../../util/keyboard';
import { clickTarget } from '../../util/mouse';
import { sleep } from '../../util/time';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';
export class Login implements GameAction {
    private static instance: Login;

    static getInstance() {
        if (Login.instance) return Login.instance;

        Login.instance = new Login();
        return Login.instance;
    }
    async start(browser: Browser): Promise<void> {
        await LogService.registerLog('Verificando se esta desconectado do jogo', {}, browser.account);
        const threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

        await this.checkButtonOk(threshold);
        await this.checkLoginAttempls(browser);

        const clickWallet = await clickTarget(TargetNames.CONNECT_WALLET, threshold);
        if (!clickWallet) return;

        await LogService.registerLog('Botão conectar carteira foi detectado', {}, browser.account);
        browser.loginAttempts = browser.loginAttempts + 1;

        const clickSign = await clickTarget(TargetNames.CONNECT_WALLET_SIGN, threshold, 15);
        if (!clickSign) return;

        await this.checkClickTreasuteHut(browser, threshold);
    }

    private async checkClickTreasuteHut(browser: Browser, threshold: number) {
        const clickTreasuteHunt = await clickTarget(TargetNames.TREASURE_HUNT, threshold, 20);

        if (clickTreasuteHunt) {
            browser.loginAttempts = 0;
            await LogService.registerLog('Colocando heróis para trabalhar', {}, browser.account);
        }
    }

    private async checkButtonOk(threshold: number) {
        const exists = await clickTarget(TargetNames.OK, 0.6);
        if (exists) {
            await sleep(15000);
        }
    }
    private async checkLoginAttempls(browser: Browser) {
        if (browser.loginAttempts == undefined) {
            browser.loginAttempts = 0;
        }
        if (browser.loginAttempts > 3) {
            browser.loginAttempts = 0;
            await LogService.registerLog('Forçando recarregamento da pagina', {}, browser.account);
            controlF5();
            await sleep(15000);
        }
    }
}
