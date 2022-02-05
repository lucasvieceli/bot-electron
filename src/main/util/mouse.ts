import { centerTarget, findTarget } from './find-target';
import { TargetNames } from './find-target.types';
import { getTime, sleep, timeToSeconds } from './time';

const robotjs = require('robotjs');

export const moveMouseAndClick = async (x: number, y: number) => {
    await robotjs.moveMouseSmooth(x, y);
    await sleep(300);
    await robotjs.mouseClick('left', false);
    await sleep(300);
};

/**
 * Verifica se realmente cliclou, robotjs as vezes não clica no elemento
 */
const moveMouseAndClickRepeat = async (
    x: number,
    y: number,
    target: TargetNames,
    threshold: number,
    print?: string,
) => {
    let attempts = 0;
    await moveMouseAndClick(x, y);

    while (attempts <= 3) {
        console.log('não cliclou, tentativa ' + attempts);
        const [match] = await findTarget(target, threshold, print);
        if (match) {
            attempts++;
            await sleep(300);
            continue;
        }
        return true;
    }

    return false;
};

export const clickTarget = async (
    target: TargetNames,
    threshold: number,
    timeOut = 3,
    print?: string,
    retryClick = true,
) => {
    const startTime = getTime();
    let hasTimeOut = false;

    while (!hasTimeOut) {
        const [match] = await findTarget(target, threshold, print);
        if (!match) {
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
};

export const moveAndDragMouse = async (x: number, y: number) => {
    robotjs.setMouseDelay(300);
    robotjs.moveMouseSmooth(x, y);
    robotjs.mouseToggle('down');
    robotjs.moveMouseSmooth(x, y - 200);
    robotjs.mouseToggle('up');
    robotjs.setMouseDelay(10);
};
