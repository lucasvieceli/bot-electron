const cv = require('./opencv');
import { app } from 'electron';
import Jimp from 'jimp';
import path from 'path';
import { defaultStorageFolder } from '..';
import { CenterTarget, TargetMatch, TargetNames, TargetsCv } from './find-target.types';
import { printScreen } from './print-screen';

let targets: TargetsCv = {} as TargetsCv;

export const findTarget = async (
    target: TargetNames,
    threshold: number = 0.7,
    print?: string,
): Promise<TargetMatch[]> => {
    const printScreenSource = !print ? await printScreen() : print;

    const imageSource = await Jimp.read(
        Buffer.from(printScreenSource.replace(/^data:image\/png;base64,/, ''), 'base64'),
    );

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
    const positions = [];
    for (let i = 0; i < contours.size(); ++i) {
        let [x, y] = contours.get(i).data32S; // Contains the points

        positions.push({ x, y, height: templ.rows, width: templ.cols });
    }
    return positions;
};

export const centerTarget = ({ x, height, width, y }: TargetMatch): CenterTarget => {
    return {
        x: x + width / 2,
        y: y + height / 2,
    };
};

const getTemplate = async (target: TargetNames) => {
    if (target in targets) {
        return targets[target];
    }
    const imageTemplate = await Jimp.read(path.join(defaultStorageFolder, 'images', target));
    const templ = cv.matFromImageData(imageTemplate.bitmap);

    targets[target] = templ;

    return templ;
};
