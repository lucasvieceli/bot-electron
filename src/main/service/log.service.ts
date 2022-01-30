import Database from '../database/Database';
import Account from '../database/models/account.model';
import Log from '../database/models/log.model';
import { LogParams } from './log.types';

const registerLog = async (message: string, params: LogParams = {}, accountId?: number | Account): Promise<Log> => {
    const repo = Database.getInstance().getRepository<Log>('Log');

    const log = repo.create({
        message,
        params,
        account: accountId,
    });
    await repo.save(log);
    return log;
};

export default { registerLog };
