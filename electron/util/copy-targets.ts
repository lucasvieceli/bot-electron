import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { defaultStorageFolder, isDev } from '../main';

var basepath = app.getAppPath();
console.log(basepath)
export async function copyTargets() {
        const pathSource = isDev ? path.join(basepath,  'assets', 'targets') : path.join(basepath, '..', '..', 'assets', 'targets');
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
