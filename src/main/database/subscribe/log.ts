import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { win } from '../..';
import Log from '../models/log';

@EventSubscriber()
export class LogSubscriber implements EntitySubscriberInterface {
    listenTo() {
        return Log;
    }

    afterInsert(event: InsertEvent<Log>) {
        win.webContents.send('log', event.entity);
    }
}
