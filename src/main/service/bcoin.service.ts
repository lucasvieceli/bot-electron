import Database from '../database/Database';
import Account from '../database/models/account.model';
import Bcoin from '../database/models/bcoin.model';
import paginateService from './paginate.service';
import { PaginationParams, TotalBcoinParams } from './bcoin.types';
import { Brackets, Not, MoreThanOrEqual, LessThan, FindConditions } from 'typeorm';
import { endOfDay, endOfYesterday, parseJSON, startOfDay, startOfYesterday, sub } from 'date-fns';

const addBcoinAccount = async (account: Account, bcoin: number) => {
    const repo = Database.getInstance().getRepository<Bcoin>('Bcoin');

    const create = repo.create({
        qty: bcoin,
        account,
    });

    await repo.save(create);
    return create;
};

const getQueryPagination = (params: PaginationParams) => {
    const query = Database.getInstance().connection.createQueryBuilder();
    query.select(['b', 'a']);
    query.from(Bcoin, 'b');
    query.leftJoin('b.account', 'a');
    query.orderBy('b.id', 'DESC');

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
        query.andWhere('b.created BETWEEN :createdStart AND :createdEnd', {
            createdStart: dateStart,
            createdEnd: dateEnd,
        });
    }
    if (params.qty) {
        query.andWhere('b.qty = :qty', {
            qty: params.qty,
        });
    }

    return query;
};

const pagination = async (params: PaginationParams) => {
    const query = getQueryPagination(params);
    return await paginateService.pagination(query, { page: params.page });
};

const getBcoinDay = async (qty: number, account: Account, id?: number) => {
    const repo = Database.getInstance().getRepository<Bcoin>('Bcoin');
    let where: FindConditions<Bcoin> = { account };

    if (id) {
        where = { ...where, id: LessThan(id) };
    }

    const lastBcoin = await repo.findOne({
        where,
        order: { id: 'DESC' },
    });
    if (lastBcoin) {
        //fez um saque
        if (madeBcoinWithdrawal(lastBcoin.qty, qty)) {
            return lastBcoin.qty - qty;
        } else {
            return qty - lastBcoin.qty;
        }
    }
    // if (lastBcoin && qty > 0) {
    //     return qty - lastBcoin.qty;
    // }

    return 0;
};

const madeBcoinWithdrawal = (qtyBefore: number, qtyAfter: number) => {
    return qtyAfter < qtyBefore;
};

const getTotalBcoin = async (params: TotalBcoinParams) => {
    const query = getQueryPagination(params);

    const totalQueryBuilder = query.clone();

    totalQueryBuilder.skip(undefined).limit(undefined).offset(undefined).take(undefined);

    const { value } = await totalQueryBuilder
        .select('SUM(b.qtyDay)', 'value')
        .setParameters(query.getParameters())
        .getRawOne<{ value: string }>();

    return Number(value);
};
const getTotalBcoinYesterday = async () => {
    const dateStart = startOfYesterday().toJSON().replace('T', ' ');
    const dateEnd = endOfYesterday().toJSON().replace('T', ' ');

    const query = Database.getInstance().connection.createQueryBuilder();
    const { value } = await query
        .select(['m'])
        .from(Bcoin, 'm')
        .andWhere('m.created BETWEEN :createdStart AND :createdEnd', {
            createdStart: dateStart,
            createdEnd: dateEnd,
        })
        .select('sum(m.qtyDay)', 'value')
        .getRawOne<{ value: string }>();

    return Number(value);
};
const getAverageBcoinLastWeek = async () => {
    const dateObj = new Date();
    const dateStart = sub(dateObj, { days: 7 }).toJSON().replace('T', ' ');
    const dateEnd = dateObj.toJSON().replace('T', ' ');

    const query = Database.getInstance().connection.createQueryBuilder();
    const { value } = await query
        .select(['m'])
        .from(Bcoin, 'm')
        .andWhere('m.created BETWEEN :createdStart AND :createdEnd', {
            createdStart: dateStart,
            createdEnd: dateEnd,
        })
        .select('sum(m.qtyDay)', 'value')
        .getRawOne<{ value: string }>();

    const newValue = Number(value);
    if (newValue > 0) {
        return newValue / 7;
    }

    return 0;
};
export default {
    addBcoinAccount,
    pagination,
    getBcoinDay,
    getTotalBcoin,
    getTotalBcoinYesterday,
    getAverageBcoinLastWeek,
};
