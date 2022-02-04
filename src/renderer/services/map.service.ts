import { ipcRenderer } from 'electron';
import Map from '../../main/database/models/map.model';
import { EVENT_MAP_AVERAGE_LAST_WEEK, EVENT_MAP_LIST, EVENT_MAP_TOTAL } from '../../main/service/events.types';
import { PaginationParams, TotalMapsParams } from '../../main/service/map.types';
import { PaginationResponse } from '../../main/service/paginate.types';

const getPagination = async (params: PaginationParams): Promise<PaginationResponse<Map>> => {
    return ipcRenderer.sendSync(EVENT_MAP_LIST, params);
};
const getTotal = async (params: TotalMapsParams): Promise<number> => {
    return ipcRenderer.sendSync(EVENT_MAP_TOTAL, params);
};
const getAverageMapsLastWeek = (): Promise<number> => {
    return ipcRenderer.sendSync(EVENT_MAP_AVERAGE_LAST_WEEK);
};
export default { getPagination, getTotal, getAverageMapsLastWeek };
