import { LogService, MapService } from '..';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget } from '../../util/mouse';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';

export class NewMap implements GameAction {
    async start(browser: Browser): Promise<void> {
        const threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

        const exists = await clickTarget({ target: TargetNames.NEW_MAP, threshold });
        if (!exists) return;

        await LogService.registerLog('Clicado em novo mapa', {}, browser.account);
        await MapService.addMapAccount(browser.account);
    }
}
