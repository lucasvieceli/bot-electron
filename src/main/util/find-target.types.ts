export enum TargetNames {
    METAMASK = 'metamask.png',
    METAMASK_COPY = 'copy.png',
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
