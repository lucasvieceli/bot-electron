import AbortController from 'abort-controller';
import { Browser } from './browser.class';

export class Action {
    configTime: string;
    lastTime: number = 0;
    name: string;
    browser: Browser;
    controller: AbortController;
    threshold: number;

    constructor(configTime?: string) {
        this.configTime = configTime;
    }

    public async start(browser: Browser, abortController?: AbortController): Promise<void> {}
    public async stop(): Promise<void> {
        try {
            if (this.controller) {
                this.controller.abort();
            }
        } catch (e) {}
    }
}
