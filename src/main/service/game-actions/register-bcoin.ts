import { format } from 'date-fns';
import Account from '../../database/models/account.model';
import configService from '../config.service';
import { Browser } from '../game-loop.types';
import { GameAction } from './game-action.types';
import { BcoinService, LogService } from '..';
import { clickTarget } from '../../util/mouse';
import { TargetNames } from '../../util/find-target.types';
import { GameLoop } from '../game-loop.service';
import { sleep } from '../../util/time';
import { printScreen } from '../../util/print-screen';
import { findTarget } from '../../util/find-target';
import { match } from 'assert';

export class RegisterBcoin implements GameAction {
    static instance: RegisterBcoin;
    configRegister = 'game-action-metamask-last-date';
    hourCheck = '21';

    static getInstance() {
        if (RegisterBcoin.instance) return RegisterBcoin.instance;

        RegisterBcoin.instance = new RegisterBcoin();
        return RegisterBcoin.instance;
    }

    async start(browser?: Browser): Promise<void> {
        const date = new Date();

        const hour = format(date, 'H');
        const current = format(date, 'yyyy-MM-dd');
        const lastDate = await this.getLastDateRegister(browser.account.id);
        console.log((!lastDate || lastDate < current) && hour == this.hourCheck, 'aaaaaa');

        if ((!lastDate || lastDate < current) && hour == this.hourCheck) {
            await LogService.registerLog('Registrando quantos bcoin possui no momento', {}, browser.account.id);

            const threshold = parseFloat(GameLoop.getInstance().getConfigByName('threshold-default', '0.7'));
            const clickChest = await clickTarget(TargetNames.CHEST, threshold);
            if (!clickChest) return;

            await sleep(8000);
            const digits = await this.getDigits();
            await LogService.registerLog('Encontrou {{bcoin}} bcoin', { bcoin: digits }, browser.account.id);

            if (digits !== '') {
                await this.setLastDateRegister(current, browser.account.id);
                await BcoinService.addBcoinAccount(browser.account, parseFloat(digits));
            }
            await clickTarget(TargetNames.X, threshold);
        }
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
        ];

        for (const { num, img } of search) {
            const matchs = await findTarget(img, 0.95, print);
            console.log(matchs);
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
