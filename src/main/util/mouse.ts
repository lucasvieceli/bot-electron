import { TargetNames } from './find-target.types';
import { centerTarget, findTarget } from './find-target';
import { getTime, sleep, timeToSeconds } from './time';
import { GameLoop } from '../service/game-loop.service';
import { Console } from 'console';

const robotjs = require('robotjs');

export const moveMouseAndClick = async (x: number, y: number) => {
    await robotjs.moveMouseSmooth(x, y);
    await sleep(300);
    await robotjs.mouseClick('left', false);
    await sleep(300);
};

export const clickTarget = async (target: TargetNames, threshold: number, timeOut = 3, print?: string) => {
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
        await moveMouseAndClick(center.x, center.y);
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
