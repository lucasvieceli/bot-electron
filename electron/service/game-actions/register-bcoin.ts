import AbortController from 'abort-controller';
import { BcoinService, LogService } from '..';
import { AbortedError } from '../../util/aborted-error';
import { findTarget } from '../../util/find-target';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget } from '../../util/mouse';
import { printScreen } from '../../util/print-screen';
import { sleep } from '../../util/time';
import { Action, Browser, GameLoop } from '../game-api';

export class RegisterBcoin extends Action {
    name = 'register-bcoin';

    async start(browser?: Browser): Promise<void> {
        this.controller = new AbortController();
        
        return

        //desabilitado, precisa refazer

        // await new Promise(async (resolve, reject) => {
        //     try {
        //         this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
        //         await LogService.registerLog('Registrando quantos bcoin possui no momento', {}, browser.account);

        //         this.threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));
        //         const clickChest = await clickTarget({
        //             target: TargetNames.CHEST,
        //             threshold: this.threshold,
        //             abortController: this.controller,
        //         });
        //         if (!clickChest) {
        //             await LogService.registerLog('Não conseguiu encontar imagem do baú', {}, browser.account);
        //             resolve(false);
        //             return;
        //         }

        //         await LogService.registerLog(
        //             'Sistema irá aguardar por 8 segundos caso aconteça algum lentidão no bomb',
        //             {},
        //             browser.account,
        //         );

        //         await sleep(8000, { abortControler: this.controller });
        //         const digits = await this.getDigits();

        //         if (digits !== '') {
        //             await LogService.registerLog('Encontrou {{bcoin}} bcoin', { bcoin: digits }, browser.account);

        //             await BcoinService.addBcoinAccount(browser.account, parseFloat(digits));
        //         } else {
        //             await LogService.registerLog('Não conseguiu registrar os bcoins', {}, browser.account);
        //         }

        //         await clickTarget({
        //             target: TargetNames.X,
        //             threshold: this.threshold,
        //             abortController: this.controller,
        //         });
        //         resolve(true);
        //     } catch (e) {
        //         console.log(e, 'register-bcoin:start');

        //         reject(e);
        //     }
        // });
    }

    private async getDigits() {
        return await new Promise<string>(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

                const print = await printScreen({ abortController: this.controller });
                const digits = [];
                const search = [
                    { num: 0, img: TargetNames.NUMBER_0 },
                    { num: 1, img: TargetNames.NUMBER_1 },
                    { num: 2, img: TargetNames.NUMBER_2 },
                    { num: 3, img: TargetNames.NUMBER_3 },
                    { num: 4, img: TargetNames.NUMBER_4 },
                    { num: 5, img: TargetNames.NUMBER_5 },
                    { num: 6, img: TargetNames.NUMBER_6 },
                    { num: 7, img: TargetNames.NUMBER_7 },
                    { num: 8, img: TargetNames.NUMBER_8 },
                    { num: 9, img: TargetNames.NUMBER_9 },
                    { num: '.', img: TargetNames.NUMBER_PONTO },
                    { num: '.', img: TargetNames.NUMBER_VIRGULA },
                ];

                for (const { num, img } of search) {
                    const matchs = await findTarget({
                        target: img,
                        threshold: 0.95,
                        print,
                        abortController: this.controller,
                    });
                    for (const match of matchs) {
                        digits.push({ digit: num, x: match.x });
                    }
                }

                if (digits.length == 0) {
                    resolve('');
                    return;
                }

                digits.sort((a, b) => (a.x > b.x ? 1 : -1));
                digits.pop();
                resolve(digits.map((d) => d.digit).join(''));
            } catch (e) {
                console.log(e, 'register-bcoin:getDigits');
                reject(e);
            }
        });
    }
}
