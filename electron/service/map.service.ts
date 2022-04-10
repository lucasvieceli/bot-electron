import { endOfDay, startOfDay, startOfWeek, sub } from 'date-fns';
import { Brackets } from 'typeorm';
import Database from '../database/Database';
import Account from '../database/models/account.model';
import Map from '../database/models/map.model';
import { PaginationParams, TotalMapsParams } from './map.types';
import paginateService from './paginate.service';

const addMapAccount = async (account: Account) => {
    const repo = Database.getInstance().getRepository<Map>('Map');

    const create = repo.create({
        account,
    });

    await repo.save(create);
    return create;
};

const getQueryPagination = (params: PaginationParams) => {
    const query = Database.getInstance().connection.createQueryBuilder();
    query.select(['m', 'a']);
    query.from(Map, 'm');
    query.leftJoin('m.account', 'a');
    query.orderBy('m.id', 'DESC');

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
    return await paginateService.pagination(query, { page: params.page });
};

const getTotalMaps = async (params: TotalMapsParams) => {
    const query = getQueryPagination(params);

    const totalQueryBuilder = query.clone();

    totalQueryBuilder.skip(undefined).limit(undefined).offset(undefined).take(undefined);

    const { value } = await totalQueryBuilder
        .select('count(*)', 'value')
        .setParameters(query.getParameters())
        .getRawOne<{ value: string }>() as { value: string };

    return Number(value);
};

const getAverageMapsLastWeek = async () => {
    const dateObj = new Date();
    const dateStart = sub(dateObj, { days: 7 }).toJSON().replace('T', ' ');
    const dateEnd = dateObj.toJSON().replace('T', ' ');

    const query = Database.getInstance().connection.createQueryBuilder();
    const { value } = await query
        .select(['m'])
        .from(Map, 'm')
        .andWhere('m.created BETWEEN :createdStart AND :createdEnd', {
            createdStart: dateStart,
            createdEnd: dateEnd,
        })
        .select('count(*)', 'value')
        .getRawOne<{ value: string }>() as { value: string };

    const newValue = Number(value);
    if (newValue > 0) {
        return newValue / 7;
    }

    return 0;
};

export default { addMapAccount, getTotalMaps, pagination, getAverageMapsLastWeek };
