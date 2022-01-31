import { UpdateResult } from 'typeorm';
import Database from '../database/Database';
import Config from '../database/models/config.model';

const getConfigSystem = async (): Promise<Config[]> => {
    const repo = Database.getInstance().getRepository<Config>('Config');

    return repo.find({ where: { account: null } });
};

const getConfig = async (name: string, accountId?: number): Promise<Config | null> => {
    const repo = Database.getInstance().getRepository<Config>('Config');
    const where = accountId
        ? {
              account: accountId,
              name,
          }
        : { name };
    return repo.findOne({ where });
};
const setConfig = async (name: string, value: string, accountId?: number): Promise<Config> => {
    const repo = Database.getInstance().getRepository<Config>('Config');

    const where = accountId
        ? {
              account: accountId,
              name,
          }
        : { name };

    const exists = await repo.findOne({ where });

    if (exists) {
        exists.value = value;
        return await repo.save(exists);
    }

    const create = repo.create({
        ...where,
        value,
    });

    return await repo.save(create);
};

export default { getConfigSystem, getConfig, setConfig };
