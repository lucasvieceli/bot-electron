import { TargetNames } from './find-target.types';
import { PrintScreenResponse } from './print-screen.types';

export interface ClickTargetParams {
    target: TargetNames;
    threshold: number;
    timeOut?: number;
    print?: PrintScreenResponse;
    retryClick?: boolean;
}
