import Log from '../../electron/database/models/log.model';
import { EVENT_LOG_LIST } from '../../variables';
import { PaginationParams } from '../../electron/service/log.types';
import { PaginationResponse } from '../../electron/service/paginate.types';



const getPagination = async (params: PaginationParams): Promise<PaginationResponse<Log>> => {
    return window.$electron.request(EVENT_LOG_LIST, params);
};

const getLastLogs = async (): Promise<PaginationResponse<Log>> => {
    const result = (await window.$electron.request(EVENT_LOG_LIST, {
        page: 1,
        orderId: 'DESC',
    } as PaginationParams)) as PaginationResponse<Log>;
    if (result) {
        result.items.reverse();
    }

    return result;
};
export default { getPagination, getLastLogs };
