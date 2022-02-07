import { LogService } from '..';
import { TargetNames } from '../../util/find-target.types';
import { controlF5 } from '../../util/keyboard';
import { clickTarget } from '../../util/mouse';
import { sleep } from '../../util/time';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';
export class Login implements GameAction {
    async start(browser: Browser): Promise<void> {
        try {
            await LogService.registerLog('Verificando se esta desconectado do jogo', {}, browser.account);
            const threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

            await this.checkButtonOk(threshold);
            await this.checkLoginAttempls(browser);

            const clickWallet = await clickTarget({ target: TargetNames.CONNECT_WALLET, threshold });
            if (!clickWallet) return;

            await LogService.registerLog('Botão conectar carteira foi detectado', {}, browser.account);
            browser.loginAttempts = browser.loginAttempts + 1;

            const clickSign = await clickTarget({ target: TargetNames.CONNECT_WALLET_SIGN, threshold, timeOut: 15 });
            if (!clickSign) return;

            await this.checkClickTreasuteHut(browser, threshold);
        } catch (e) {
            console.log(e, 'login:start');
            throw e;
        }
    }

    private async checkClickTreasuteHut(browser: Browser, threshold: number) {
        try {
            const clickTreasuteHunt = await clickTarget({ target: TargetNames.TREASURE_HUNT, threshold, timeOut: 20 });

            if (clickTreasuteHunt) {
                browser.loginAttempts = 0;
                await LogService.registerLog('Colocando heróis para trabalhar', {}, browser.account);
            }
        } catch (e) {
            console.log(e, 'login:checkClickTreasuteHut');
            throw e;
        }
    }

    private async checkButtonOk(threshold: number) {
        try {
            const exists = await clickTarget({ target: TargetNames.OK, threshold: 0.6 });
            if (exists) {
                await sleep(15000);
            }
        } catch (e) {
            console.log(e, 'login:checkButtonOk');
            throw e;
        }
    }
    private async checkLoginAttempls(browser: Browser) {
        try {
            if (browser.loginAttempts == undefined) {
                browser.loginAttempts = 0;
            }
            if (browser.loginAttempts > 3) {
                browser.loginAttempts = 0;
                await LogService.registerLog('Forçando recarregamento da pagina', {}, browser.account);
                controlF5();
                await sleep(15000);
            }
        } catch (e) {
            console.log(e, 'login:checkLoginAttempls');
            throw e;
        }
    }
}
