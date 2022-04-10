// import { EventResponse } from '../../electron/service/events.types';

export const returnEvent = <T>(data: any): any | never => {
    if (data.status === 'error') {
        throw data.data;
    }

    return data;
};
