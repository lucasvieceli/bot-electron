import { BrowserWindow, nativeImage } from 'electron';
import path from 'path';
import { clickCenterWindow } from './mouse';
import { sleep } from './time';

export const WINDOW_WIDTH = 960;
export const WINDOW_HEIGHT = 642;

export const createWindowBomb = async (): Promise<BrowserWindow> => {
    const window = new BrowserWindow({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        frame: false,
        autoHideMenuBar: true,
        center: true,
        resizable: false,
        movable: true,
        icon: nativeImage.createFromPath(path.join(__dirname, '..', '..', '..', 'assets', 'images', 'bcoin.ico')),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });
    window.loadURL('https://app.bombcrypto.io/webgl/index.html?a=' + new Date().getTime());
    window.show();
    window.webContents.setAudioMuted(true);
    await sleep(1000);
    window.setAlwaysOnTop(true);
    window.setAlwaysOnTop(false);
    await sleep(500);
    await clickCenterWindow(window);
    return window;
};
