import Database from '../database/Database';
import Config from '../database/models/config.model';

const getConfig = async (): Promise<Config> => {
    const repo = Database.getInstance().getRepository<Config>('Config');

    return repo.findOne('config');
};

export default { getConfig };
