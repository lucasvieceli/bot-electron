import AbortController from 'abort-controller';
import { LogService } from '..';
import { AbortedError } from '../../util/aborted-error';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget } from '../../util/mouse';
import { sleep } from '../../util/time';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';
import { Login } from './login';

export class ErrorButton implements GameAction {
    browser: Browser;
    controller: AbortController;
    async start(browser: Browser): Promise<void> {
        this.controller = new AbortController();

        await new Promise(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
                this.browser = browser;

                await LogService.registerLog('Verificando se exibiu mensagem de erro', {}, this.browser.account);
                const exists = await clickTarget({
                    target: TargetNames.OK,
                    threshold: 0.7,
                    abortController: this.controller,
                });

                if (exists) {
                    await sleep(15000);
                    const actionLogin = new Login();
                    await actionLogin.start(browser, this.controller);
                }
                resolve(true);
            } catch (e) {
                console.log(e, 'error-button:start');

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
