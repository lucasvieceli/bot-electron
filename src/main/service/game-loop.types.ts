import { BrowserWindow } from 'electron';
import Account from '../database/models/account.model';
import { GameAction } from './game-actions/game-action.types';

export interface ActionsConfig {
    configTime?: string;
    lastTime: number;
    action: GameAction;
    name: string;
}

export interface Browser {
    [key: string]: any;
    account?: Account;
    browser: BrowserWindow;
    logged: boolean;
    timeActionsPerformed: Record<string, number>;
}

export interface ActionsStartConfig {
    action: GameAction;
    name: string;
}

export type MetamaskId = string;
