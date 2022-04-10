export interface PaginationOptions {
    page?: number;
    limit?: number;
}

export interface PaginationResponse<T> {
    items: T[];
    page: number;
    totalItems: number;
    totalPages: number;
    nextPage: number | null;
    previousPage: number | null;
}
