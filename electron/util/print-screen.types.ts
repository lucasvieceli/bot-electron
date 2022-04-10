import AbortController from 'abort-controller';

export type PrintScreenResponse = string | null;
export interface PrintScreenParams {
    abortController?: AbortController;
}
