import { BrowserWindow } from 'electron';
import Account from '../database/models/account.model';
import { GameAction } from './game-actions/game-action.types';

export interface Browser {
    [key: string]: any;
    account?: Account;
    browser: BrowserWindow;
}

export interface ActionsConfig {
    configTime?: string;
    lastTime: number;
    action: GameAction;
    name: string;
}
export interface ActionsStartConfig {
    action: GameAction;
    name: string;
}

export type MetamaskId = string;
