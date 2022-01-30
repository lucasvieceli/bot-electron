import { remote } from 'electron';
import Database from '../../main/database/Database';
import Config from '../../main/database/models/config.model';

const database: Database = remote.getGlobal('database');

const getAll = async (): Promise<Config> => {
    const repo = database.getRepository<Config>('Config');
    return repo.findOne('config');
};
const update = async (values: Config) => {
    return await database.connection
        .createQueryBuilder()
        .update('Config')
        .set(values)
        .where('id = :id', { id: 'config' })
        .execute();
};
const updateColumn = async (column: string, value: string) => {
    return await database.connection
        .createQueryBuilder()
        .update('Config')
        .set({ [column]: value })
        .where('id = :id', { id: 'config' })
        .execute();
};
export default { getAll, update, updateColumn };
