import AbortController from 'abort-controller';
import { AbortedError } from './aborted-error';

export const getTime = (): number => new Date().getTime();
export const timeToSeconds = (time: number): number => time / 1000;
export const timeToMinutes = (time: number): number => time / (1000 * 60);
export const sleep = async (
    time: number,
    options?: {
        abortControler: AbortController;
    },
) => {
    try {
        await new Promise((r, reject) => {
            const id = setTimeout(r, time);

            if (options && options.abortControler) {
                options.abortControler.signal.addEventListener('abort', () => {
                    clearTimeout(id);
                    reject(new AbortedError());
                });
            }
        });
    } catch (e) {}
};
