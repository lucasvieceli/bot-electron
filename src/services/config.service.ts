import { UpdateResult } from 'typeorm';
import Config from '../../electron/database/models/config.model';
import { EVENT_CONFIG_GET, EVENT_CONFIG_GET_SYSTEM, EVENT_CONFIG_UPDATE, EVENT_CONFIG_UPDATE_COLUMN } from '../../variables';
import { returnEvent } from '../utils/return-event';

const getConfigSystem = async (): Promise<Config[]> => {
    const { data } = returnEvent<Config[]>(await window.$electron.request(EVENT_CONFIG_GET_SYSTEM));

    return data
};
const getByName = async (name: string): Promise<Config> => {
    return window.$electron.request(EVENT_CONFIG_GET, name);

};
const update = async (values: Config) => {
    const { data } = returnEvent<UpdateResult>(await window.$electron.request(EVENT_CONFIG_UPDATE, values));

    return data
};
const updateColumn = async (column: string, value: string) => {
    const { data } = returnEvent<UpdateResult>(await window.$electron.request(EVENT_CONFIG_UPDATE_COLUMN, {column, value}));

    return data
};
export default { getConfigSystem, update, updateColumn, getByName };
