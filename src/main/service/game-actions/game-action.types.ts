import Account from '../../database/models/account.model';
import { Browser } from '../game-loop.types';

export interface GameAction {
    start(browser: Browser): Promise<void>;
}