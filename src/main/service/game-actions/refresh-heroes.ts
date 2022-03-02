import AbortController from 'abort-controller';
import { LogService } from '..';
import { AbortedError } from '../../util/aborted-error';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget } from '../../util/mouse';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';

export class RefreshHeroes implements GameAction {
    threshold: number;
    browser: Browser;
    controller: AbortController;

    async start(browser: Browser): Promise<void> {
        this.controller = new AbortController();

        await new Promise(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
                this.threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

                await LogService.registerLog('Atualizando posições dos heróis', {}, browser.account);
                const clickaBack = await clickTarget({
                    target: TargetNames.GO_BACK_ARROW,
                    threshold: this.threshold,
                    abortController: this.controller,
                });
                if (!clickaBack) {
                    await LogService.registerLog('Não conseguiu clicar no botão de voltar', {}, browser.account);
                }

                const click = await clickTarget({
                    target: TargetNames.TREASURE_HUNT,
                    threshold: this.threshold,
                    abortController: this.controller,
                });
                if (!click) {
                    await LogService.registerLog('Não conseguiu atualizar posições dos heróis', {}, browser.account);
                }
                resolve(true);
            } catch (e) {
                console.log(e, 'refreshHeroes:start');

                reject(e);
            }
        });
    }
    public async stop(): Promise<void> {
        try {
            if (this.controller) {
                this.controller.abort();
            }
        } catch (e) {}
    }
}
