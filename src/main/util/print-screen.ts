import { writeFile } from 'fs';
import { GameLoop } from '../service/game-loop.service';
import { PrintScreenResponse } from './print-screen.types';

export const printScreen = async (): Promise<PrintScreenResponse> => {
    try {
        const gameLoop = GameLoop.getInstance();
        if (!gameLoop.browserActive) return null;
        const capture = await gameLoop.browserActive.capturePage();

        writeFile(`./test.png`, capture.toPNG(), (err) => {});

        return capture.toDataURL();
    } catch (e) {
        console.log('error printScreen');
        throw e;
    }
};
