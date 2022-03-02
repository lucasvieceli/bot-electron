import AbortController from 'abort-controller';
import { Browser } from '../game-loop.types';

export interface GameAction {
    start(browser: Browser, abortController?: AbortController): Promise<void>;
    stop(): Promise<void>;
}
