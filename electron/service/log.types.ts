import Log from '../database/models/log.model';

export interface LogParams {
    [key: string]: string;
}

export interface PaginationParams {
    page?: number;
    account?: string;
    created?: string;
    orderId?: 'ASC' | 'DESC';
}
