import { clipboard } from 'electron';
import { AccountService, LogService } from '..';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget, moveMouseAndClick } from '../../util/mouse';
import { sleep } from '../../util/time';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';

export class MetamaskId implements GameAction {
    private static instance: MetamaskId;

    static getInstance() {
        if (MetamaskId.instance) return MetamaskId.instance;

        MetamaskId.instance = new MetamaskId();
        return MetamaskId.instance;
    }
    async start(browser: Browser): Promise<void> {
        await LogService.registerLog('Buscando metamask ID');
        const threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

        await clickTarget(TargetNames.METAMASK, threshold, 10, undefined, false);
        const match = await clickTarget(TargetNames.METAMASK_COPY, threshold, 15);

        const id = clipboard.readText();

        if (match && id) {
            await moveMouseAndClick(match.x - 400, match.y + 100);
            await sleep(2000);

            const account = await AccountService.findByMetamaskIdOrCreate(id);

            if (account) {
                await LogService.registerLog('Encontrou conta {{conta}}', {
                    conta: account.name || account.metamaskId,
                });
                browser.account = account;
                return;
            }

            await LogService.registerLog('Não conseguiu criar conta {{conta}}', { conta: id });
        }
    }
}
