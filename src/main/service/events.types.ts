export const EVENT_GAME_LOOP_STATUS = 'game-loop:status';
export const EVENT_GAME_LOOP_STATUS_PAUSED = 'game-loop:status-paused';
export const EVENT_GAME_LOOP_START = 'game-loop:start';
export const EVENT_GAME_LOOP_STOP = 'game-loop:stop';
export const EVENT_GAME_LOOP_PAUSE = 'game-loop:pause';
export const EVENT_GAME_LOOP_CONTINUE = 'game-loop:continue';
export const EVENT_GAME_LOOP_BROWSER = 'game-loop:browser';

export const EVENT_BCOIN_LIST = 'bcoin:list';
export const EVENT_BCOIN_TOTAL = 'bcoin:total';
export const EVENT_BCOIN_TOTAL_YESTERDAY = 'bcoin:total-yesterday';
export const EVENT_BCOIN_AVERAGE_LAST_WEEK = 'bcoin:average-last-week';
export const EVENT_MAP_LIST = 'map:list';
export const EVENT_MAP_TOTAL = 'map:total';
export const EVENT_MAP_AVERAGE_LAST_WEEK = 'map:average-last-week';
export const EVENT_LOG_LIST = 'log:list';
export const EVENT_ACCOUNT_LIST = 'account:list';
export const EVENT_ACCOUNT_CHANGE_NAME = 'account:change_name';
export const EVENT_ACCOUNT_CREATE = 'account:create';
export const EVENT_ACCOUNT_DELETE = 'account:delete';
export const EVENT_ACCOUNT_CHANGE = 'account:change';
export const EVENT_ACCOUNT_INFO = 'account:info';

export interface EventResponse<T> {
    status: 'success' | 'error';
    data: T;
}
