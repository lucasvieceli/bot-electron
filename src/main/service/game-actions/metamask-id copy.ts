// import { format } from 'date-fns';
// import Account from '../../database/models/account.model';
// import configService from '../config.service';
// import { GameAction } from './game-action.types';

// export class MetamaskId implements GameAction {
//     configRegister = 'game-action-metamask-last-date';
//     hourCheck = '01';

//     async start(account?: Account): Promise<void> {
//         if (!account) return;

//         const date = new Date();

//         const hour = format(date, 'H');
//         const min = format(date, 'mm');
//         const current = format(date, 'yyyy-MM-dd');
//         const lastDate = await this.getLastDateRegister(account.id);

//         this.setLastDateRegister(current, account.id);
//         console.log(hour, min, lastDate, current);

//         if (lastDate < current && hour == this.hourCheck) {
//         }
//     }

//     private async getLastDateRegister(accountId: number) {
//         const result = await configService.getConfig(this.configRegister, accountId);
//         return result ? result.value : null;
//     }

//     private async setLastDateRegister(date: string, accountId: number) {
//         return configService.setConfig(this.configRegister, date, accountId);
//     }
// }
