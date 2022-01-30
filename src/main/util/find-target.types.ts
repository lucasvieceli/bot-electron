export enum TargetNames {
    WALDO = 'waldo.jpg',
}

export interface CenterTarget {
    x: number;
    y: number;
}

export interface TargetMatch {
    x: number;
    y: number;
    height: number;
    width: number;
}

export type TargetsCv = { [key in TargetNames]: any };
