import Account from '../../electron/database/models/account.model';
import { AccountCreate } from '../../electron/dto/account-create';
import { AccountChange, PaginationParams } from '../../electron/service/account.types';
import {
    EVENT_ACCOUNT_CHANGE,
    EVENT_ACCOUNT_CHANGE_NAME,
    EVENT_ACCOUNT_CREATE,
    EVENT_ACCOUNT_DELETE,
    EVENT_ACCOUNT_INFO,
    EVENT_ACCOUNT_LIST,
} from '../../variables';
import { PaginationResponse } from '../../electron/service/paginate.types';
import { returnEvent } from '../utils/return-event';



const getName = (account: Account) => {
    if(!account) return null;
    return account.name || account.metamaskId;
};
const getPagination = async (params: PaginationParams): Promise<PaginationResponse<Account>> => {
    return window.$electron.request(EVENT_ACCOUNT_LIST, params);
};

const changeName = (accountId: number, name: string): Promise<Account> => {
    return window.$electron.request(EVENT_ACCOUNT_CHANGE_NAME, { accountId, name });
};

const create = async (item: AccountCreate) => {
    const { data } = returnEvent(await window.$electron.request(EVENT_ACCOUNT_CREATE, item));

    return data;
};
const change = async (item: AccountChange) => {
    const { data } = returnEvent(await window.$electron.request(EVENT_ACCOUNT_CHANGE, item));

    return data;
};
const getById = (params: number) => {
    return window.$electron.request(EVENT_ACCOUNT_INFO, params);
};
const remove = (id: string | number) => {
    return window.$electron.request(EVENT_ACCOUNT_DELETE, id);
};
export default { getName, getPagination, changeName, create, getById, change, remove };
