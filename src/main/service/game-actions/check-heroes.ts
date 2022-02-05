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
    async start(browser: Browser): Promise<void> {
        await LogService.registerLog('Buscando heróis disponíveis', {}, browser.account);
        const threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));

        await this.goToHeroes(threshold, browser);
        await this.search(browser, threshold);
    }

    private async search(browser: Browser, threshold: number) {
        const exists = await this.getPositionHero();
        if (!exists) {
            await LogService.registerLog('Não identificou nenhum herói para fazer a rolagem', {}, browser.account);
            await this.goToWork(threshold, browser);
            return false;
        }
        let total = 0;

        for (let i = 0; i <= 5; i++) {
            total += await this.clickGreenBar(browser);

            await this.scroll();
            await sleep(1000);
        }
        await LogService.registerLog('Enviando {{qty}} heróis', { qty: total.toString() }, browser.account);
        await this.goToWork(threshold, browser);
    }

    private async scroll() {
        const hero = await this.getPositionHero();

        if (hero) {
            await moveAndDragMouse(hero.x, hero.y);
        }
    }

    private async getPositionHero() {
        const configs = GameLoop.getInstance().config;

        const search = [
            { img: TargetNames.COMMON_TEXT, threshold: configs.find((c) => c.name == 'threshold-hero-common') },
            { img: TargetNames.RARE_TEXT, threshold: configs.find((c) => c.name == 'threshold-hero-rare') },
            { img: TargetNames.SUPER_RARE_TEXT, threshold: configs.find((c) => c.name == 'threshold-hero-super-rare') },
            { img: TargetNames.EPIC_TEXT, threshold: configs.find((c) => c.name == 'threshold-hero-epic') },
        ];

        for (let item of search) {
            const exists = await findTargetRepeat(item.img, parseFloat(item.threshold.value) || 0.8);
            if (exists) {
                return exists[0];
            }
        }

        return null;
    }

    private async clickGreenBar(browser: Browser) {
        const offset = 100;
        const print = await printScreen();
        const thresholdBar = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-bar-life', '0.85'));
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
    }

    private isWorking(hero: TargetMatch, buttons: TargetMatch[]) {
        const y = hero.y;
        for (const button of buttons) {
            const isBelow = y < button.y + button.height;
            const isAbove = y > button.y - button.height;

            if (isBelow && isAbove) return false;
        }
        return true;
    }

    private async goToHeroes(threshold: number, browser: Browser) {
        await clickTarget(TargetNames.GO_BACK_ARROW, threshold);
        const clickHero = await clickTarget(TargetNames.HERO_ICON, threshold, 4);
        if (!clickHero) {
            await LogService.registerLog('Não identificou botão para ir na listagem dos heróis', {}, browser.account);
        }
    }

    private async goToWork(threshold: number, browser: Browser) {
        const clickX = await clickTarget(TargetNames.X, threshold);
        if (!clickX) {
            await LogService.registerLog('Não identificou botão de fechar listagem', {}, browser.account);
        }

        const clickTreasure = await clickTarget(TargetNames.TREASURE_HUNT, threshold, 4);
        if (!clickTreasure) {
            await LogService.registerLog('Não identificou botão iniciar jogo', {}, browser.account);
        }
    }
}
