import Account from '../database/models/account.model';
import { AccountUpdate } from '../dto/Account-update';

export interface PaginationParams {
    page?: number;
    name?: string;
    created?: string;
    metamaskId?: string;
}

export interface AccountChangeName {
    name: string;
    accountId: string;
}
export interface AccountChange {
    value: AccountUpdate;
    id: string | number;
}
