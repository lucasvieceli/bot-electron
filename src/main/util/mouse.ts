import { BrowserWindow } from 'electron';
import { WINDOW_BOMBCRYPTO_HEIGHT, WINDOW_BOMBCRYPTO_WIDTH } from '../../variables';
import { AbortedError } from './aborted-error';
import { centerTarget, findTarget } from './find-target';
import { TargetMatch } from './find-target.types';
import {
    ClickTargetParams,
    MoveAndDragMouseParams,
    MoveMouseAndClick,
    MoveMouseAndClickRepeatParams,
} from './mouse.types';
import { getTime, sleep, timeToSeconds } from './time';
import { getWindowBombcryptoHeight, getWindowBombcryptoWidth } from './window';

const robotjs = require('robotjs');
const timeMouse = process.platform == 'win32' ? 1 : 3;

export const moveMouseAndClick = async ({ x, y, abortController }: MoveMouseAndClick) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            if (abortController && abortController.signal) {
                abortController.signal.addEventListener('abort', () => reject(new AbortedError()));
            }

            await robotjs.moveMouseSmooth(x, y, timeMouse);
            await sleep(300);
            await robotjs.mouseClick('left', false);
            await sleep(500);
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

const moveMouseAndClickRepeat = async ({
    x,
    y,
    target,
    threshold,
    print,
    abortController,
}: MoveMouseAndClickRepeatParams) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            if (abortController && abortController.signal) {
                abortController.signal.addEventListener('abort', () => reject(new AbortedError()));
            }
            let attempts = 0;

            while (attempts <= 3) {
                await moveMouseAndClick({ x, y, abortController });
                await sleep(300);

                const [match] = await findTarget({ target, threshold, print, abortController });
                if (match) {
                    console.log(`não cliclou, tentativa ${attempts} ${target}`);
                    attempts++;
                    await sleep(300);
                    continue;
                }
                resolve(true);
                return;
            }

            resolve(false);
        } catch (e) {
            reject(e);
        }
    });
};

export const clickTarget = async (params: ClickTargetParams) => {
    return new Promise<TargetMatch | false>(async (resolve, reject) => {
        try {
            const { target, threshold, timeOut = 3, print, retryClick = false, abortController } = params;
            if (abortController && abortController.signal) {
                abortController.signal.addEventListener('abort', () => reject(new AbortedError()));
            }
            const startTime = getTime();
            let hasTimeOut = false;

            while (!hasTimeOut) {
                const [match] = await findTarget({ target, threshold, print, abortController });
                if (!match) {
                    console.log(`não encontrou target ${target}`);
                    hasTimeOut = timeToSeconds(getTime() - startTime) > timeOut;
                    await sleep(1000);
                    continue;
                }

                const center = centerTarget(match);
                if (retryClick) {
                    await moveMouseAndClickRepeat({
                        x: center.x,
                        y: center.y,
                        target,
                        threshold,
                        print,
                        abortController,
                    });
                } else {
                    await moveMouseAndClick({ x: center.x, y: center.y, abortController });
                }

                await sleep(300);
                resolve(match);
                return;
            }

            resolve(false);
        } catch (e) {
            console.log('error clickTarget ', e);
            reject(e);
        }
    });
};

export const moveAndDragMouse = async ({ x, y, abortController }: MoveAndDragMouseParams) => {
    return new Promise<boolean>(async (resolve, reject) => {
        if (abortController && abortController.signal) {
            abortController.signal.addEventListener('abort', () => reject(new AbortedError()));
        }

        robotjs.moveMouseSmooth(x, y, timeMouse);
        await sleep(300);

        robotjs.mouseToggle('down', 'left');
        robotjs.moveMouse(x, y - 200);

        robotjs.dragMouse(x, y - 200);
        robotjs.mouseToggle('up');

        resolve(true);
    });
};

export const clickCenterWindow = async (browser: BrowserWindow) => {
    const [xWindow, yWindow] = browser.getPosition();

    const x = xWindow + getWindowBombcryptoWidth() / 2;
    const y = yWindow + getWindowBombcryptoHeight() / 2;
    robotjs.moveMouseSmooth(x, y, 0);
    robotjs.mouseClick('left', false);
};
