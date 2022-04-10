import AbortController from 'abort-controller';
import { LogService } from '..';
import { AbortedError } from '../../util/aborted-error';
import { centerTarget, findTarget, findTargetRepeat } from '../../util/find-target';
import { CenterTarget, TargetMatch, TargetNames } from '../../util/find-target.types';
import { clickTarget, getPosition, moveAndDragMouse, moveMouseAndClick } from '../../util/mouse';
import { printScreen } from '../../util/print-screen';
import { sleep } from '../../util/time';
import { Action, Browser, GameLoop } from '../game-api';

export class CheckHeroes extends Action {
    name = 'check-heroes';

    async start(browser: Browser): Promise<void> {
        this.controller = new AbortController();

        await new Promise(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
                this.browser = browser;
                this.threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

                await LogService.registerLog('Buscando heróis disponíveis', {}, browser.account);

                await this.goToHeroes();
                // await this.setAll()
                //ate que consiga corrigir scroll vai se colocado pra todos trabalhar
                await this.search();
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    }



    private async setAll() {
        return await new Promise<boolean>(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

                const [x,y] = this.browser.browserWindow.getPosition()


                await moveMouseAndClick({x: getPosition(458 + x), y: getPosition(159 + y)})
                await sleep(1000);
                await moveMouseAndClick({x: getPosition(399+ x), y: getPosition(159 + y)})
                await this.goToWork();
                resolve(true);
            } catch (e) {
                console.log(e, 'check-heroes:search');
                reject(e);
            }
        });
    }

    private async search() {
        return await new Promise<boolean>(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

                const exists = await this.getPositionBar();
                if (!exists) {
                    await LogService.registerLog(
                        'Não identificou nenhum herói para fazer a rolagem',
                        {},
                        this.browser.account,
                    );
                    await this.goToWork();
                    resolve(false);
                    return;
                }
                let total = 0;

                for (let i = 0; i <= 4; i++) {
                    total += await this.clickGreenBar();

                    await this.scroll();
                    await sleep(1500);
                }
                await LogService.registerLog(
                    'Enviando {{qty}} heróis',
                    { qty: total.toString() },
                    this.browser.account,
                );
                await this.goToWork();
                resolve(true);
            } catch (e) {
                console.log(e, 'check-heroes:search');
                reject(e);
            }
        });
    }

    private async scroll() {
        return await new Promise(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

                const bar = await this.getPositionBar();

                if (bar) {
                    await moveAndDragMouse({ x: bar.x, y: bar.y, abortController: this.controller });
                }
                resolve(true);
            } catch (e) {
                console.log(e, 'check-heroes:scroll');
                reject(e);
            }
        });
    }

    private async getPositionBar() {
        return await new Promise<CenterTarget | null>(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

                const exists = await findTargetRepeat({
                    target: TargetNames.BAR_LIST,
                    threshold: this.threshold,
                    timeOut: 0.9,
                    abortController: this.controller,
                });

                if (exists) {
                    resolve(centerTarget(exists[0]));

                    return;
                }
                resolve(null);
            } catch (e) {
                console.log(e, 'check-heroes:getPositionBar');
                reject(e);
            }
        });
    }

    private async clickGreenBar() {
        return await new Promise<number>(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));
                const game = GameLoop.getInstance();

                const offset = 100;
                const print = await printScreen({ abortController: this.controller });
                const thresholdBar = parseFloat(await game.getConfigByName('threshold-bar-life', '0.9'));
                const thresholdGoWork = parseFloat(await game.getConfigByName('threshold-button-work', '0.9'));

                const [fullBars, greenBars] = await Promise.all([
                    findTarget({
                        target: TargetNames.FULL_BAR,
                        threshold: thresholdBar,
                        print,
                        abortController: this.controller,
                    }),
                    findTarget({
                        target: TargetNames.GREEN_BAR,
                        threshold: thresholdBar,
                        print,
                        abortController: this.controller,
                    }),
                ]);
                const bars = [...fullBars, ...greenBars];
                const notWorkingGreenBars: TargetMatch[] = [];

                let buttons = await findTarget({
                    target: TargetNames.GO_WORK,
                    threshold: thresholdGoWork,
                    print,
                    abortController: this.controller,
                });
                for (const bar of bars) {
                    if (!this.isWorking(bar, buttons)) {
                        notWorkingGreenBars.push(bar);
                    }
                }

                await LogService.registerLog(
                    'Detectado {{qty}} heróis disponíveis',
                    { qty: notWorkingGreenBars.length.toString() },
                    this.browser.account,
                );
                if (notWorkingGreenBars.length) {
                    notWorkingGreenBars.sort((a, b) => (a.y > b.y ? 1 : -1));
                    for (const bar of notWorkingGreenBars) {
                        const center = centerTarget(bar);
                        await moveMouseAndClick({
                            x: center.x + offset,
                            y: center.y,
                            abortController: this.controller,
                        });
                    }
                }

                resolve(notWorkingGreenBars.length);
            } catch (e) {
                console.log(e, 'check-heroes:clickGreenBar');
                reject(e);
            }
        });
    }

    private isWorking(hero: TargetMatch, buttons: TargetMatch[]) {
        try {
            const y = hero.y;
            for (const button of buttons) {
                const isBelow = y < button.y + button.height;
                const isAbove = y > button.y - button.height;

                if (isBelow && isAbove) return false;
            }
            return true;
        } catch (e) {
            console.log(e, 'check-heroes:usWorking');
            throw e;
        }
    }

    private async goToHeroes() {
        return await new Promise(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

                await clickTarget({
                    target: TargetNames.GO_BACK_ARROW,
                    threshold: this.threshold,
                    abortController: this.controller,
                });
                const clickHero = await clickTarget({
                    target: TargetNames.HERO_ICON,
                    threshold: this.threshold,
                    timeOut: 4,
                    abortController: this.controller,
                });
                if (!clickHero) {
                    await LogService.registerLog(
                        'Não identificou botão para ir na listagem dos heróis',
                        {},
                        this.browser.account,
                    );
                }
                resolve(true);
            } catch (e) {
                console.log(e, 'check-heroes:goToHeroes');
                reject(e);
            }
        });
    }

    private async goToWork() {
        return await new Promise(async (resolve, reject) => {
            try {
                this.controller.signal.addEventListener('abort', () => reject(new AbortedError()));

                const clickX = await clickTarget({
                    target: TargetNames.X,
                    threshold: this.threshold,
                    abortController: this.controller,
                });
                if (!clickX) {
                    await LogService.registerLog('Não identificou botão de fechar listagem', {}, this.browser.account);
                }
                const clickTreasure = await clickTarget({
                    target: TargetNames.TREASURE_HUNT,
                    threshold: this.threshold,
                    timeOut: 4,
                    abortController: this.controller,
                });
                if (!clickTreasure) {
                    await LogService.registerLog('Não identificou botão iniciar jogo', {}, this.browser.account);
                }
                resolve(true);
            } catch (e) {
                console.log(e, 'check-heroes:goToWork');
                reject(e);
            }
        });
    }
}
