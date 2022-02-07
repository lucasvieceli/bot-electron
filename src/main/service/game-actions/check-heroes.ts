import { LogService } from '..';
import { centerTarget, findTarget, findTargetRepeat } from '../../util/find-target';
import { TargetMatch, TargetNames } from '../../util/find-target.types';
import { clickTarget, moveAndDragMouse, moveMouseAndClick } from '../../util/mouse';
import { printScreen } from '../../util/print-screen';
import { sleep } from '../../util/time';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';
export class CheckHeroes implements GameAction {
    threshold: number;

    async start(browser: Browser): Promise<void> {
        try {
            await LogService.registerLog('Buscando heróis disponíveis', {}, browser.account);
            this.threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

            await this.goToHeroes(browser);
            await this.search(browser);
        } catch (e) {
            console.log(e, 'check-heroes:start');
            throw e;
        }
    }

    private async search(browser: Browser) {
        try {
            const exists = await this.getPositionBar();
            if (!exists) {
                await LogService.registerLog('Não identificou nenhum herói para fazer a rolagem', {}, browser.account);
                await this.goToWork(browser);
                return false;
            }
            let total = 0;

            for (let i = 0; i <= 4; i++) {
                total += await this.clickGreenBar(browser);

                await this.scroll();
                await sleep(1500);
            }
            await LogService.registerLog('Enviando {{qty}} heróis', { qty: total.toString() }, browser.account);
            await this.goToWork(browser);
        } catch (e) {
            console.log(e, 'check-heroes:search');
            throw e;
        }
    }

    private async scroll() {
        try {
            const bar = await this.getPositionBar();

            if (bar) {
                await moveAndDragMouse(bar.x, bar.y);
            }
        } catch (e) {
            console.log(e, 'check-heroes:scroll');
            throw e;
        }
    }

    private async getPositionBar() {
        try {
            const exists = await findTargetRepeat(TargetNames.BAR_LIST, this.threshold, 6);

            if (exists) {
                return centerTarget(exists[0]);
            }
        } catch (e) {
            console.log(e, 'check-heroes:getPositionBar');
            throw e;
        }

        return null;
    }

    private async clickGreenBar(browser: Browser) {
        try {
            const offset = 100;
            const print = await printScreen();
            const thresholdBar = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-bar-life', '0.9'));
            const thresholdGoWork = parseFloat(
                await GameLoop.getInstance().getConfigByName('threshold-button-work', '0.9'),
            );

            const [fullBars, greenBars] = await Promise.all([
                findTarget(TargetNames.FULL_BAR, thresholdBar, print),
                findTarget(TargetNames.GREEN_BAR, thresholdBar, print),
            ]);
            const buttons = await findTarget(TargetNames.GO_WORK, thresholdGoWork, print);
            const bars = [...fullBars, ...greenBars];

            const notWorkingGreenBars: TargetMatch[] = [];
            for (const bar of bars) {
                if (!this.isWorking(bar, buttons)) {
                    notWorkingGreenBars.push(bar);
                }
            }
            await LogService.registerLog(
                'Detectado {{qty}} heróis disponíveis',
                { qty: notWorkingGreenBars.length.toString() },
                browser.account,
            );
            if (notWorkingGreenBars.length) {
                notWorkingGreenBars.sort((a, b) => (a.y > b.y ? 1 : -1));
                for (const bar of notWorkingGreenBars) {
                    const center = centerTarget(bar);
                    await moveMouseAndClick(center.x + offset, center.y);
                }
            }

            return notWorkingGreenBars.length;
        } catch (e) {
            console.log(e, 'check-heroes:clickGreenBar');
            throw e;
        }
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

    private async goToHeroes(browser: Browser) {
        try {
            await clickTarget({ target: TargetNames.GO_BACK_ARROW, threshold: this.threshold });
            const clickHero = await clickTarget({
                target: TargetNames.HERO_ICON,
                threshold: this.threshold,
                timeOut: 4,
            });
            if (!clickHero) {
                await LogService.registerLog(
                    'Não identificou botão para ir na listagem dos heróis',
                    {},
                    browser.account,
                );
            }
        } catch (e) {
            console.log(e, 'check-heroes:goToHeroes');
            throw e;
        }
    }

    private async goToWork(browser: Browser) {
        try {
            const clickX = await clickTarget({ target: TargetNames.X, threshold: this.threshold });
            if (!clickX) {
                await LogService.registerLog('Não identificou botão de fechar listagem', {}, browser.account);
            }
            const clickTreasure = await clickTarget({
                target: TargetNames.TREASURE_HUNT,
                threshold: this.threshold,
                timeOut: 4,
            });
            if (!clickTreasure) {
                await LogService.registerLog('Não identificou botão iniciar jogo', {}, browser.account);
            }
        } catch (e) {
            console.log(e, 'check-heroes:goToWork');
            throw e;
        }
    }
}
