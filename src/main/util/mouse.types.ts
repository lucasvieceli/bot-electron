import { TargetNames } from './find-target.types';
import { PrintScreenResponse } from './print-screen.types';
import AbortController from 'abort-controller';

export interface ClickTargetParams {
    target: TargetNames;
    threshold: number;
    timeOut?: number;
    print?: PrintScreenResponse;
    retryClick?: boolean;
    abortController?: AbortController;
}
export interface MoveMouseAndClickRepeatParams {
    x: number;
    y: number;
    target: TargetNames;
    threshold: number;
    print?: PrintScreenResponse;
    abortController?: AbortController;
}
export interface MoveAndDragMouseParams {
    x: number;
    y: number;
    abortController?: AbortController;
}
export interface MoveMouseAndClick {
    x: number;
    y: number;
    abortController?: AbortController;
}
