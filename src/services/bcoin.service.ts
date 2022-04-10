import Bcoin from '../../electron/database/models/bcoin.model';
import { TotalBcoinParams, PaginationParams } from '../../electron/service/bcoin.types';
import {
    EVENT_BCOIN_AVERAGE_LAST_WEEK,
    EVENT_BCOIN_LIST,
    EVENT_BCOIN_TOTAL,
    EVENT_BCOIN_TOTAL_YESTERDAY,
} from '../../variables';
import { PaginationResponse } from '../../electron/service/paginate.types';


const getPagination = async (params: PaginationParams): Promise<PaginationResponse<Bcoin>> => {
    return window.$electron.request(EVENT_BCOIN_LIST, params);
};
const getTotal = async (params: TotalBcoinParams): Promise<number> => {
    return window.$electron.request(EVENT_BCOIN_TOTAL, params);
};
const getTotalYesterday = async (): Promise<number> => {
    return window.$electron.request(EVENT_BCOIN_TOTAL_YESTERDAY);
};
const getAverageBcoinLastWeek = async (): Promise<number> => {
    return window.$electron.request(EVENT_BCOIN_AVERAGE_LAST_WEEK);
};

export default { getPagination, getTotal, getTotalYesterday, getAverageBcoinLastWeek };
