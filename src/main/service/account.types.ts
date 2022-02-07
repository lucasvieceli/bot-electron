export interface PaginationParams {
    page?: number;
    name?: string;
    created?: string;
    metamaskId?: string;
}

export interface AccountChangeName {
    name: string;
    accountId: string;
}
