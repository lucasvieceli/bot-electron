import { ipcRenderer } from 'electron';
import Bcoin from '../../main/database/models/bcoin.model';
import { TotalBcoinParams, PaginationParams } from '../../main/service/bcoin.types';
import {
    EVENT_BCOIN_AVERAGE_LAST_WEEK,
    EVENT_BCOIN_LIST,
    EVENT_BCOIN_TOTAL,
    EVENT_BCOIN_TOTAL_YESTERDAY,
} from '../../main/service/events.types';
import { PaginationResponse } from '../../main/service/paginate.types';

const getPagination = async (params: PaginationParams): Promise<PaginationResponse<Bcoin>> => {
    return ipcRenderer.sendSync(EVENT_BCOIN_LIST, params);
};
const getTotal = async (params: TotalBcoinParams): Promise<number> => {
    return ipcRenderer.sendSync(EVENT_BCOIN_TOTAL, params);
};
const getTotalYesterday = async (): Promise<number> => {
    return ipcRenderer.sendSync(EVENT_BCOIN_TOTAL_YESTERDAY);
};
const getAverageBcoinLastWeek = async (): Promise<number> => {
    return ipcRenderer.sendSync(EVENT_BCOIN_AVERAGE_LAST_WEEK);
};

export default { getPagination, getTotal, getTotalYesterday, getAverageBcoinLastWeek };
