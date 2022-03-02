import { writeFile } from 'fs';
import { GameLoop } from '../service/game-api/game-loop.class';
import { AbortedError } from '../util/aborted-error';
import { PrintScreenParams, PrintScreenResponse } from './print-screen.types';

export const printScreen = async ({ abortController }: PrintScreenParams = {}): Promise<PrintScreenResponse> => {
    return new Promise<PrintScreenResponse>(async (resolve, reject) => {
        try {
            if (abortController && abortController.signal) {
                abortController.signal.addEventListener('abort', () => reject(new AbortedError()));
            }

            const gameLoop = GameLoop.getInstance();

            if (!gameLoop.browserActive) return null;
            const capture = await gameLoop.browserActive.capturePage();

            writeFile(`./test.png`, capture.toPNG(), (err) => {});

            resolve(capture.toDataURL());
        } catch (e) {
            console.log('error printScreen', e);
            reject(e);
        }
    });
};
