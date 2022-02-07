import { ipcRenderer } from 'electron';
import Account from '../../main/database/models/account.model';
import { PaginationParams } from '../../main/service/account.types';
import { EVENT_ACCOUNT_CHANGE_NAME, EVENT_ACCOUNT_LIST } from '../../main/service/events.types';
import { PaginationResponse } from '../../main/service/paginate.types';

const getName = (account: Account) => {
    return account.name || account.metamaskId;
};
const getPagination = async (params: PaginationParams): Promise<PaginationResponse<Account>> => {
    return ipcRenderer.sendSync(EVENT_ACCOUNT_LIST, params);
};

const changeName = (accountId: number, name: string): Promise<Account> => {
    return ipcRenderer.sendSync(EVENT_ACCOUNT_CHANGE_NAME, { accountId, name });
};
export default { getName, getPagination, changeName };
