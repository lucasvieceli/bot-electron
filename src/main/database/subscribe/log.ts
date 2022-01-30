import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { win } from '../..';
import Database from '../Database';
import Log from '../models/log.model';

@EventSubscriber()
export class LogSubscriber implements EntitySubscriberInterface {
    listenTo() {
        return Log;
    }

    async afterInsert(event: InsertEvent<Log>) {
        const repo = Database.getInstance().getRepository<Log>('Log');
        const entity = await repo.findOne(event.entity.id, { relations: ['account'] });
        win.webContents.send('log', entity);
    }
}
