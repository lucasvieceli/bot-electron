import { SelectQueryBuilder } from 'typeorm';
import { PaginationOptions, PaginationResponse } from './paginate.types';

const LIMIT = 30;

const countQuery = async <T>(queryBuilder: SelectQueryBuilder<T>): Promise<number> => {
    const totalQueryBuilder = queryBuilder.clone();

    totalQueryBuilder.skip(undefined).limit(undefined).offset(undefined).take(undefined);

    const { value } = await queryBuilder.connection
        .createQueryBuilder()
        .select('COUNT(*)', 'value')
        .from(`(${totalQueryBuilder.getQuery()})`, 'uniqueTableAlias')
        .setParameters(queryBuilder.getParameters())
        .getRawOne<{ value: string }>();

    return Number(value);
};

const resolveOptions = (options: PaginationOptions) => {
    const { page = 1, limit = LIMIT, ...props } = options;

    return {
        page,
        limit,
        ...props,
    };
};

const itemsQuery = <T>(queryBuilder: SelectQueryBuilder<T>, options?: PaginationOptions) => {
    return queryBuilder
        .take(options.limit)
        .skip((options.page - 1) * options.limit)
        .getMany();
};

const pagination = async <T>(
    querybuilder: SelectQueryBuilder<T>,
    options: PaginationOptions,
): Promise<PaginationResponse<T>> => {
    const newOptions = resolveOptions(options);

    const [items, totalItems] = await Promise.all([itemsQuery(querybuilder, newOptions), countQuery(querybuilder)]);

    const totalPages = Math.ceil(totalItems / newOptions.limit);
    const nextPage = totalPages > newOptions.page ? newOptions.page + 1 : null;
    const previousPage = newOptions.page > 1 ? newOptions.page - 1 : null;
    return {
        items,
        page: newOptions.page,
        totalPages,
        totalItems,
        previousPage,
        nextPage,
    };
};

export default { pagination, countQuery };
