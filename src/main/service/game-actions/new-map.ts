import { LogService } from '..';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget } from '../../util/mouse';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';

export class NewMap implements GameAction {
    private static instance: NewMap;

    static getInstance() {
        if (NewMap.instance) return NewMap.instance;

        NewMap.instance = new NewMap();
        return NewMap.instance;
    }
    async start(browser: Browser): Promise<void> {
        const threshold = parseFloat(GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

        const exists = await clickTarget(TargetNames.NEW_MAP, threshold);
        if (!exists) return;

        await LogService.registerLog('Clicado em novo mapa', {}, browser.account.id);
    }
}
