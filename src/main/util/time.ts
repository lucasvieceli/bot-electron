export const getTime = (): number => new Date().getTime();
export const timeToSeconds = (time: number): number => time / 1000;
export const sleep = async (time: number) => await new Promise((r) => setTimeout(r, time));
