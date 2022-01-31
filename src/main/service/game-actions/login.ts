import { LogService } from '..';
import { controlF5 } from '../../util/keyboard';
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

        // robotjs.keyTap('f5', 'control');
        controlF5();
        // if (browser.loginAttempts > 3) {
        //     browser.loginAttempts = 0;
        // }
    }
}
