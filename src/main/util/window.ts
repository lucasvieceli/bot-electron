import { BrowserWindow, nativeImage, screen } from 'electron';
import path from 'path';
import { isDev } from '..';
import {
    WINDOW_BOMBCRYPTO_IFRAME_HEIGHT,
    WINDOW_BOMBCRYPTO_IFRAME_WIDTH,
    WINDOW_BOMBCRYPTO_TOOL_BAR_HEIGHT,
} from '../../variables';
import Account from '../database/models/account.model';
import { sleep } from './time';

export const createWindowBomb = async (account: Account, index: number): Promise<BrowserWindow> => {
    const factor = screen.getPrimaryDisplay().scaleFactor;

    const window = new BrowserWindow({
        width: getWindowBombcryptoWidth(),
        height: getWindowBombcryptoHeight(),
        frame: false,
        autoHideMenuBar: true,
        // center: true,
        ...getPositionBrowser(index),
        movable: false,
        icon: nativeImage.createFromPath(path.join(__dirname, '..', '..', '..', 'assets', 'images', 'bcoin.ico')),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            // zoomFactor: 1.0 / factor,
            // zoomFactor: 1.0,
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

    window.once('ready-to-show', async () => {
        window.webContents.setZoomFactor(1.0 / factor);
        window.show();
        window.webContents.setAudioMuted(true);
        window.setAlwaysOnTop(true);
        window.setAlwaysOnTop(false);

        await sleep(300);
    });
    return window;
};

export const getPositionBrowser = (index: number) => {
    const marginTop = 180;
    const { workArea } = screen.getPrimaryDisplay();
    const height = getWindowBombcryptoHeight();
    const width = getWindowBombcryptoWidth();
    const qtyRow = Math.trunc(workArea.width / width) || 1;
    const qtyColumn = Math.trunc((workArea.height - marginTop) / height) || 1;
    let indexQty = 0;
    let x = 0;
    let y = 0;

    while (indexQty <= index) {
        for (let row = 0; row < qtyRow; row++) {
            for (let column = 0; column < qtyColumn; column++) {
                x = width * row;
                y = height * column + marginTop;

                if (y == 0) {
                    y = marginTop;
                }

                if (indexQty == index) {
                    return { x, y };
                }
                indexQty++;
            }
        }
    }

    return { x, y };
};

export const getWindowBombCryptoIframeWidth = () => {
    const factor = screen.getPrimaryDisplay().scaleFactor;

    return WINDOW_BOMBCRYPTO_IFRAME_WIDTH / factor;
};
export const getWindowBombCryptoIframeHeight = () => {
    const factor = screen.getPrimaryDisplay().scaleFactor;

    return WINDOW_BOMBCRYPTO_IFRAME_HEIGHT / factor;
};
export const getWindowBombcryptoWidth = () => {
    return getWindowBombCryptoIframeWidth();
};

export const getWindowBombcryptoToolBarHeight = () => {
    const factor = screen.getPrimaryDisplay().scaleFactor;
    return WINDOW_BOMBCRYPTO_TOOL_BAR_HEIGHT / factor;
};

export const getWindowBombcryptoHeight = () => {
    return getWindowBombCryptoIframeHeight() + getWindowBombcryptoToolBarHeight();
};
