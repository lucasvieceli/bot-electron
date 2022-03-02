import { BrowserWindow, nativeImage } from 'electron';
import path from 'path';
import { isDev } from '..';
import { WINDOW_BOMBCRYPTO_HEIGHT, WINDOW_BOMBCRYPTO_WIDTH } from '../../variables';
import Account from '../database/models/account.model';
import { clickCenterWindow } from './mouse';
import { sleep } from './time';

export const createWindowBomb = async (account: Account): Promise<BrowserWindow> => {
    const window = new BrowserWindow({
        width: WINDOW_BOMBCRYPTO_WIDTH,
        height: WINDOW_BOMBCRYPTO_HEIGHT,
        frame: false,
        autoHideMenuBar: true,
        center: true,
        movable: true,
        icon: nativeImage.createFromPath(path.join(__dirname, '..', '..', '..', 'assets', 'images', 'bcoin.ico')),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            scrollBounce: true,
        },
    });
    // window.loadURL('https://app.bombcrypto.io/webgl/index.html?a=' + new Date().getTime());
    if (isDev) {
        window.loadURL('http://localhost:8080/#/bombcrypto/' + account.name || account.metamaskId);
    } else {
        window.loadFile('./dist-webpack/renderer/index.html', {
            hash: '/bombcrypto/' + account.name || account.metamaskId,
        });
    }
    window.show();
    window.webContents.setAudioMuted(true);
    await sleep(1000);
    window.setAlwaysOnTop(true);
    window.setAlwaysOnTop(false);
    await sleep(500);
    await clickCenterWindow(window);
    return window;
};
