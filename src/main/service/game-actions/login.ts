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
        await LogService.registerLog('Verificando se esta desconectado do jogo', {}, browser.account?.id);
        const threshold = parseFloat(GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));
        if (browser.loginAttempts == undefined) {
            browser.loginAttempts = 0;
        }

        if (await clickTarget(TargetNames.OK, threshold)) {
            await sleep(15000);
        }

        if (browser.loginAttempts > 3) {
            browser.loginAttempts = 0;
            await LogService.registerLog('Forçando recarregamento da pagina', {}, browser.account?.id);
            controlF5();
        }

        const clickWallet = await clickTarget(TargetNames.CONNECT_WALLET, threshold, 10);
        if (!clickWallet) return;

        await LogService.registerLog('Botão conectar carteira foi detectado', {}, browser.account?.id);
        browser.loginAttempts = browser.loginAttempts + 1;

        const clickSign = await clickTarget(TargetNames.CONNECT_WALLET_SIGN, threshold, 15);
        if (!clickSign) return;

        const clickTreasuteHunt = await clickTarget(TargetNames.TREASURE_HUNT, threshold, 20);

        if (clickTreasuteHunt) {
            browser.loginAttempts = 0;
            await LogService.registerLog('Colocando heróis para trabalhar', {}, browser.account?.id);
        }
    }
}
