import { endOfDay, startOfDay } from 'date-fns';
import Database from '../database/Database';
import Account from '../database/models/account.model';
import { AccountChangeName, PaginationParams } from './account.types';
import paginateService from './paginate.service';

const findByMetamaskIdOrCreate = async (metamaskId: string): Promise<Account> => {
    const repo = Database.getInstance().getRepository<Account>('Account');

    const exists = await repo.findOne({
        where: {
            metamaskId,
        },
    });

    if (exists) return exists;

    const create = repo.create({ metamaskId });
    await repo.save(create);

    return create;
};

const getQueryPagination = (params: PaginationParams) => {
    const query = Database.getInstance().connection.createQueryBuilder();
    query.select(['m']);
    query.from(Account, 'm');

    query.orderBy('m.id', 'DESC');

    if (params.name) {
        query.orWhere('m.name like :account', { account: `%${params.name}%` });
    }

    if (params.metamaskId) {
        query.orWhere('m.metamaskId like :metamaskId', { account: `%${params.name}%` });
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
    return await paginateService.pagination<Account>(query, { page: params.page });
};

const changeName = async ({ accountId, name }: AccountChangeName) => {
    const repo = Database.getInstance().getRepository<Account>('Account');
    const account = await repo.findOne(accountId);
    account.name = name;

    await repo.save(account);

    return account;
};

export default { findByMetamaskIdOrCreate, pagination, getQueryPagination, changeName };
