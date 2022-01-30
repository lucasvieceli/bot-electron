import { TargetNames } from './find-target.types';
import { centerTarget, findTarget } from './find-target';
import { getTime, sleep, timeToSeconds } from './time';

const robotjs = require('robotjs');

export const moveMouseAndClick = async (x: number, y: number) => {
    robotjs.moveMouseSmooth(x, y);
    robotjs.mouseClick();
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
        moveMouseAndClick(center.x, center.y);
        return true;
    }
};
