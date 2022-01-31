import Account from '../database/models/account.model';
import { GameAction } from './game-actions/game-action.types';

export interface Browser {
    [key: string]: any;
    account?: Account;
}

export interface ActionsConfig {
    configTime?: string;
    lastTime: number;
    action: GameAction;
}
export interface ActionsStartConfig {
    action: GameAction;
}

export type MetamaskId = string;
