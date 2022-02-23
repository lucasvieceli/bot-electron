const cv = require('./opencv');
import Electron, { BrowserWindow } from 'electron';
import Jimp from 'jimp';
import path from 'path';
import { defaultStorageFolder } from '..';
import { GameLoop } from '../service/game-loop.service';
import {
    CenterTarget,
    FindTargetParams,
    FindTargetRepeatParams,
    TargetMatch,
    TargetNames,
    TargetsCv,
} from './find-target.types';
import { printScreen } from './print-screen';
import { getTime, sleep, timeToSeconds } from './time';

export const findTarget = async (params: FindTargetParams): Promise<TargetMatch[]> => {
    try {
        const { target, threshold = 7, print = await printScreen() } = params;

        if (!print) return [];

        const positions: TargetMatch[] = [];

        const imageSource = await Jimp.read(Buffer.from(print.replace(/^data:image\/png;base64,/, ''), 'base64'));

        const templ = await getTemplate(target);
        let src = cv.matFromImageData(imageSource.bitmap);
        let processedImage = new cv.Mat();
        let mask = new cv.Mat();

        cv.matchTemplate(src, templ, processedImage, cv.TM_CCOEFF_NORMED, mask);

        cv.threshold(processedImage, processedImage, threshold, 1, cv.THRESH_BINARY);
        processedImage.convertTo(processedImage, cv.CV_8UC1);
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();

        cv.findContours(processedImage, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        const browserActive = GameLoop.getInstance().browserActive;
        const [xWindow, yWindow] = browserActive.getPosition();

        for (let i = 0; i < contours.size(); ++i) {
            let [x, y] = contours.get(i).data32S; // Contains the points

            positions.push({
                x: x + xWindow,
                y: y + yWindow,
                height: templ.rows,
                width: templ.cols,
            });
        }

        src.delete();
        mask.delete();
        templ.delete();
        return positions;
    } catch (e) {
        console.log(' error findTarget ', e);
        throw e;
    }
};

export const centerTarget = ({ x, height, width, y }: TargetMatch): CenterTarget => {
    return {
        x: x + width / 2,
        y: y + height / 2,
    };
};

const getTemplate = async (target: TargetNames) => {
    const imageTemplate = await Jimp.read(path.join(defaultStorageFolder, 'images', target));
    const templ = cv.matFromImageData(imageTemplate.bitmap);
    return templ;
};

export const findTargetRepeat = async (params: FindTargetRepeatParams) => {
    const { target, threshold = 0.7, timeOut = 3, print } = params;

    const startTime = getTime();
    let hasTimeOut = false;

    while (!hasTimeOut) {
        const match = await findTarget({ target, threshold, print });
        if (match.length == 0) {
            console.log(`Não encontrou ${target} findtargetrepeat`);
            hasTimeOut = timeToSeconds(getTime() - startTime) > timeOut;
            await sleep(1000);
            continue;
        }

        return match;
    }

    return false;
};
