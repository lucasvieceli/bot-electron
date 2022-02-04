import { BcoinService, LogService } from '..';
import { findTarget } from '../../util/find-target';
import { TargetNames } from '../../util/find-target.types';
import { clickTarget } from '../../util/mouse';
import { printScreen } from '../../util/print-screen';
import { sleep } from '../../util/time';
import configService from '../config.service';
import { GameLoop } from '../game-loop.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';

export class RegisterBcoin implements GameAction {
    static instance: RegisterBcoin;
    configRegister = 'game-action-metamask-last-date';
    hourCheck = '23';

    static getInstance() {
        if (RegisterBcoin.instance) return RegisterBcoin.instance;

        RegisterBcoin.instance = new RegisterBcoin();
        return RegisterBcoin.instance;
    }

    async start(browser?: Browser): Promise<void> {
        await LogService.registerLog('Registrando quantos bcoin possui no momento', {}, browser.account);

        const threshold = parseFloat(await GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));
        const clickChest = await clickTarget(TargetNames.CHEST, threshold);
        if (!clickChest) {
            await LogService.registerLog('Não conseguiu encontar imagem do baú', {}, browser.account);
            return;
        }

        await LogService.registerLog(
            'Sistema irá aguardar por 8 segundos caso aconteça algum lentidão no bomb',
            {},
            browser.account,
        );

        await sleep(8000);
        const digits = await this.getDigits();
        await LogService.registerLog('Encontrou {{bcoin}} bcoin', { bcoin: digits }, browser.account);

        if (digits !== '') {
            await BcoinService.addBcoinAccount(browser.account, parseFloat(digits));
        }
        await clickTarget(TargetNames.X, threshold);
    }

    private async getDigits() {
        const print = await printScreen();
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
            const matchs = await findTarget(img, 0.95, print);
            for (const match of matchs) {
                digits.push({ digit: num, x: match.x });
            }
        }

        if (digits.length == 0) {
            return '';
        }

        digits.sort((a, b) => (a.x > b.x ? 1 : -1));
        digits.pop();
        return digits.map((d) => d.digit).join('');
    }

    private async getLastDateRegister(accountId: number) {
        const result = await configService.getConfig(this.configRegister, accountId);
        return result ? result.value : null;
    }

    private async setLastDateRegister(date: string, accountId: number) {
        return configService.setConfig(this.configRegister, date, accountId);
    }
}
