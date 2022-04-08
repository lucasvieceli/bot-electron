import { ipcRenderer } from 'electron';
import { UpdateResult } from 'typeorm';
import Config from '../../main/database/models/config.model';
import { EVENT_CONFIG_GET_SYSTEM, EVENT_CONFIG_UPDATE, EVENT_CONFIG_UPDATE_COLUMN } from '../../main/service/events.types';
import { returnEvent } from '../utils/return-event';


const getConfigSystem = async (): Promise<Config[]> => {
    const { data } = returnEvent<Config[]>(await ipcRenderer.invoke(EVENT_CONFIG_GET_SYSTEM));

    return data
};
const update = async (values: Config) => {
    const { data } = returnEvent<UpdateResult>(await ipcRenderer.invoke(EVENT_CONFIG_UPDATE, values));

    return data
};
const updateColumn = async (column: string, value: string) => {
    const { data } = returnEvent<UpdateResult>(await ipcRenderer.invoke(EVENT_CONFIG_UPDATE_COLUMN, {column, value}));

    return data
};
export default { getConfigSystem, update, updateColumn };
