import AbortController from 'abort-controller';
import { LogService, MapService } from '..';
import { AbortedError } from '../../util/aborted-error';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget } from '../../util/mouse';
import { Action, Browser, GameLoop } from '../game-api';
export class NewMap extends Action {
    async start(browser: Browser): Promise<void> {
        this.controller = new AbortController();

        await new Promise(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
                this.browser = browser;
                this.threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

                const exists = await clickTarget({
                    target: TargetNames.NEW_MAP,
                    threshold: this.threshold,
                    abortController: this.controller,
                });
                if (!exists) {
                    resolve(true);
                    return;
                }

                await LogService.registerLog('Clicado em novo mapa', {}, browser.account);
                await MapService.addMapAccount(browser.account);
                resolve(true);
            } catch (e) {
                console.log(e, 'new-map:start');

                reject(e);
            }
        });
    }
}
