
export interface EventResponse<T> {
    status: 'success' | 'error';
    data: T;
}

export interface EventBroadcastParam<T> {
    name: string,
    detail: {
        data: T
    }
}