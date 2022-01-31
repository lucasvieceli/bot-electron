import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { defaultStorageFolder } from '..';

var basepath = app.getAppPath();
export async function copyTargets() {
    const pathSource = path.join(basepath, '..', '..', 'assets', 'targets');
    const pathImages = path.join(defaultStorageFolder, 'images');
    if (!fs.existsSync(defaultStorageFolder)) {
        fs.mkdirSync(defaultStorageFolder);
    }
    if (!fs.existsSync(pathImages)) {
        fs.mkdirSync(pathImages);
    }

    const files = fs.readdirSync(pathSource);
    files.forEach(function (file: string) {
        const curSource = path.join(pathSource, file);
        const curTarget = path.join(pathImages, path.basename(curSource));

        if (!fs.existsSync(curTarget)) {
            fs.writeFileSync(curTarget, fs.readFileSync(curSource));
        }
    });
}
