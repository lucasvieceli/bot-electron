import { EventResponse } from '../../main/service/events.types';

export const returnEvent = <T>(data: EventResponse<T>): EventResponse<T> | never => {
    if (data.status == 'error') {
        throw data.data;
    }

    return data;
};
