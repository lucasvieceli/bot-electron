import { PrintScreenResponse } from './print-screen.types';
import AbortController from 'abort-controller';
export enum TargetNames {
    METAMASK = 'metamask.png',
    METAMASK_1 = 'metamask-1.png',
    METAMASK_COPY = 'copy.png',
    CONNECT_WALLET = 'connect-wallet.png',
    CONNECT_WALLET_SIGN = 'select-wallet-2.png',
    TREASURE_HUNT = 'treasure-hunt-icon.png',
    OK = 'ok.png',
    CHEST = 'chest.png',
    NUMBER_0 = '0.png',
    NUMBER_1 = '1.png',
    NUMBER_2 = '2.png',
    NUMBER_3 = '3.png',
    NUMBER_4 = '4.png',
    NUMBER_5 = '5.png',
    NUMBER_6 = '6.png',
    NUMBER_7 = '7.png',
    NUMBER_8 = '8.png',
    NUMBER_9 = '9.png',
    NUMBER_PONTO = 'ponto.png',
    NUMBER_VIRGULA = 'virgula.png',
    X = 'x.png',
    GO_BACK_ARROW = 'go-back-arrow.png',
    HERO_ICON = 'hero-icon.png',
    GREEN_BAR = 'green-bar.png',
    GO_WORK = 'go-work.png',
    FULL_BAR = 'full-stamina.png',
    COMMON_TEXT = 'commom-text.png',
    RARE_TEXT = 'rare-text.png',
    SUPER_RARE_TEXT = 'super_rare-text.png',
    EPIC_TEXT = 'epic-text.png',
    NEW_MAP = 'new-map.png',
    BAR_LIST = 'bar-list.png',
    ACCEPT_CHECKBOX = 'accept-checkbox.png',
    ACCEPT_BUTTON = 'accept-button.png',
    INPUT_USERNAME = 'input-username.png',
    INPUT_PASSWORD = 'input-password.png',
    LOGIN = 'login.png',
    TERMS = 'terms.png',
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

export interface FindTargetParams {
    target: TargetNames;
    threshold?: number;
    print?: PrintScreenResponse;
    abortController?: AbortController;
    center?: boolean
}
export interface FindTargetRepeatParams extends FindTargetParams {
    timeOut?: number;
    abortController?: AbortController;
}
