export enum TargetNames {
    METAMASK = 'metamask.png',
    METAMASK_COPY = 'copy.png',
    CONNECT_WALLET = 'connect-wallet.png',
    CONNECT_WALLET_SIGN = 'select-wallet-2.png',
    TREASURE_HUNT = 'treasure-hunt-icon.png',
    OK = 'ok.png',
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
