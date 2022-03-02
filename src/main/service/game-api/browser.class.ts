import { BrowserWindow } from 'electron';
import Account from '../../database/models/account.model';
import { TargetNames } from '../../util/find-target.types';
import { clickCenterWindow, clickTarget } from '../../util/mouse';
import { sleep } from '../../util/time';

export class Browser {
    account: Account;
    browserWindow: BrowserWindow;
    logged: boolean = false;
    timeActionsPerformed: Record<string, number> = {};
    loginAttempts = 0;

    constructor(account: Account, browserWindow: BrowserWindow) {
        this.account = account;
        this.browserWindow = browserWindow;
    }

    public async show() {
        if (!this.browserWindow.isFocused() || !this.browserWindow.isVisible()) {
            this.browserWindow.focus();
            this.browserWindow.setAlwaysOnTop(true);
            this.browserWindow.setAlwaysOnTop(false);
            await sleep(500);
            await clickCenterWindow(this.browserWindow);
            await sleep(500);
        }
    }

    public async resetPosition() {
        await clickTarget({ target: TargetNames.X, threshold: 0.7 });
        await clickTarget({ target: TargetNames.GO_BACK_ARROW, threshold: 0.7 });
        await sleep(500);
    }
}
