import { endOfDay, startOfDay } from 'date-fns';
import { Brackets } from 'typeorm';
import Database from '../database/Database';
import Account from '../database/models/account.model';
import Log from '../database/models/log.model';
import { LogParams, PaginationParams } from './log.types';
import paginateService from './paginate.service';

const registerLog = async (message: string, params: LogParams = {}, account?: Account): Promise<Log> => {
    try {
        const repo = Database.getInstance().connection.getRepository<Log>('Log');

        const log = repo.create({
            message,
            params,
            account,
        });
        await repo.save(log);
        return log;
    } catch (e) {
        console.log('error registerLog ', e);
    }
};

const getQueryPagination = (params: PaginationParams) => {
    const query = Database.getInstance().connection.createQueryBuilder();
    query.select(['m', 'a']);
    query.from(Log, 'm');
    query.leftJoin('m.account', 'a');

    params.orderId ? query.orderBy('m.id', params.orderId) : query.orderBy('m.id', 'DESC');

    if (params.account) {
        query.andWhere(
            new Brackets((subQb) => {
                subQb.where('a.name = :accountName', { accountName: params.account });
                subQb.orWhere('a.metamaskId like :account', { account: `%${params.account}%` });
            }),
        );
    }
    if (params.created) {
        const date = new Date(params.created);
        const dateStart = startOfDay(date).toJSON().replace('T', ' ');
        const dateEnd = endOfDay(date).toJSON().replace('T', ' ');
        query.andWhere('m.created BETWEEN :createdStart AND :createdEnd', {
            createdStart: dateStart,
            createdEnd: dateEnd,
        });
    }

    return query;
};

const pagination = async (params: PaginationParams) => {
    const query = getQueryPagination(params);
    return await paginateService.pagination<Log>(query, { page: params.page });
};

export default { registerLog, pagination };
