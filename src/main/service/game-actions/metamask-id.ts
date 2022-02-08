import { clipboard } from 'electron';
import { AccountService, LogService } from '..';
import { centerTarget, findTargetRepeat } from '../../util/find-target';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget, moveMouseAndClick } from '../../util/mouse';
import { sleep } from '../../util/time';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';

export class MetamaskId implements GameAction {
    private static instance: MetamaskId;
    threshold: number;

    static getInstance() {
        if (MetamaskId.instance) return MetamaskId.instance;

        MetamaskId.instance = new MetamaskId();
        return MetamaskId.instance;
    }
    async start(browser: Browser): Promise<void> {
        try {
            await LogService.registerLog('Buscando metamask ID');
            this.threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

            await this.clickMetamaskButton();
            const match = await clickTarget({
                target: TargetNames.METAMASK_COPY,
                threshold: this.threshold,
                timeOut: 15,
            });

            const id = clipboard.readText();

            if (match && id && id.substring(0, 2) == '0x') {
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
        } catch (e) {
            console.log(e, 'metamask-id:start');
            throw e;
        }
    }

    async clickMetamaskButton() {
        try {
            const find = [TargetNames.METAMASK, TargetNames.METAMASK_1, TargetNames.METAMASK_2];

            const exists = await Promise.race(
                find.map((target) => findTargetRepeat({ target, threshold: this.threshold, timeOut: 10 })),
            );
            if (exists) {
                const center = centerTarget(exists[0]);
                await moveMouseAndClick(center.x, center.y);
            }
        } catch (e) {
            console.log(e, 'metamask-id:clickMetamaskButton');
            throw e;
        }
    }
}
