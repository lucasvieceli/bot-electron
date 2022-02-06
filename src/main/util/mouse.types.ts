import { TargetNames } from './find-target.types';

export interface ClickTargetParams {
    target: TargetNames;
    threshold: number;
    timeOut?: number;
    print?: string;
    retryClick?: boolean;
}
