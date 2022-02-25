import { BrowserWindow } from 'electron';
import { WINDOW_BOMBCRYPTO_HEIGHT, WINDOW_BOMBCRYPTO_WIDTH } from '../../variables';
import { centerTarget, findTarget } from './find-target';
import { TargetNames } from './find-target.types';
import { ClickTargetParams } from './mouse.types';
import { PrintScreenResponse } from './print-screen.types';
import { getTime, sleep, timeToSeconds } from './time';

const robotjs = require('robotjs');
const timeMouse = process.platform == 'win32' ? 1 : 3;

export const moveMouseAndClick = async (x: number, y: number) => {
    await robotjs.moveMouseSmooth(x, y, timeMouse);
    await sleep(300);
    await robotjs.mouseClick('left', false);
    await sleep(500);
};

const moveMouseAndClickRepeat = async (
    x: number,
    y: number,
    target: TargetNames,
    threshold: number,
    print?: PrintScreenResponse,
) => {
    let attempts = 0;

    while (attempts <= 3) {
        await moveMouseAndClick(x, y);
        await sleep(300);

        const [match] = await findTarget({ target, threshold, print });
        if (match) {
            console.log(`não cliclou, tentativa ${attempts} ${target}`);
            attempts++;
            await sleep(300);
            continue;
        }
        return true;
    }

    return false;
};

export const clickTarget = async (params: ClickTargetParams) => {
    try {
        const { target, threshold, timeOut = 3, print, retryClick = false } = params;

        const startTime = getTime();
        let hasTimeOut = false;

        while (!hasTimeOut) {
            const [match] = await findTarget({ target, threshold, print });
            if (!match) {
                console.log(`não encontrou target ${target}`);
                hasTimeOut = timeToSeconds(getTime() - startTime) > timeOut;
                await sleep(1000);
                continue;
            }

            const center = centerTarget(match);
            if (retryClick) {
                await moveMouseAndClickRepeat(center.x, center.y, target, threshold, print);
            } else {
                await moveMouseAndClick(center.x, center.y);
            }

            await sleep(300);
            return match;
        }

        return false;
    } catch (e) {
        console.log('error clickTarget ', e);
        throw e;
    }
};

export const moveAndDragMouse = async (x: number, y: number) => {
    // robotjs.setMouseDelay(300);

    robotjs.moveMouseSmooth(x, y, timeMouse);
    robotjs.mouseToggle('down');
    robotjs.moveMouseSmooth(x, y - 200, timeMouse);
    robotjs.mouseToggle('up');

    // robotjs.setMouseDelay(timeMouse);
    // robotjs.moveMouse(x, y);
    // robotjs.mouseClick();
    // robotjs.scrollMouse(0, -1000);
};

export const clickCenterWindow = async (browser: BrowserWindow) => {
    const [xWindow, yWindow] = browser.getPosition();

    const x = xWindow + WINDOW_BOMBCRYPTO_WIDTH / 2;
    const y = yWindow + WINDOW_BOMBCRYPTO_HEIGHT / 2;
    robotjs.moveMouseSmooth(x, y, 0);
    robotjs.mouseClick('left', false);
};
