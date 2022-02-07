import { LogService } from '..';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget } from '../../util/mouse';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';

export class RefreshHeroes implements GameAction {
    async start(browser: Browser): Promise<void> {
        try {
            const threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

            await LogService.registerLog('Atualizando posições dos heróis', {}, browser.account);
            const clickaBack = await clickTarget({ target: TargetNames.GO_BACK_ARROW, threshold });
            if (!clickaBack) {
                await LogService.registerLog('Não conseguiu clicar no botão de voltar', {}, browser.account);
            }

            const click = await clickTarget({ target: TargetNames.TREASURE_HUNT, threshold });
            if (!click) {
                await LogService.registerLog('Não conseguiu atualizar posições dos heróis', {}, browser.account);
            }
        } catch (e) {
            console.log(e, 'refreshHeroes:start');
            throw e;
        }
    }
}
