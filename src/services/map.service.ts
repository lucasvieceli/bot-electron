import Map from '../../electron/database/models/map.model';
import { EVENT_MAP_AVERAGE_LAST_WEEK, EVENT_MAP_LIST, EVENT_MAP_TOTAL } from '../../variables';
import { PaginationParams, TotalMapsParams } from '../../electron/service/map.types';
import { PaginationResponse } from '../../electron/service/paginate.types';


const getPagination = async (params: PaginationParams): Promise<PaginationResponse<Map>> => {
    return window.$electron.request(EVENT_MAP_LIST, params);
};
const getTotal = async (params: TotalMapsParams): Promise<number> => {
    return window.$electron.request(EVENT_MAP_TOTAL, params);
};
const getAverageMapsLastWeek = (): Promise<number> => {
    return window.$electron.request(EVENT_MAP_AVERAGE_LAST_WEEK);
};
export default { getPagination, getTotal, getAverageMapsLastWeek };
