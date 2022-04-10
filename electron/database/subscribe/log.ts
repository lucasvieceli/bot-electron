import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { contextBridge } from '../../main';
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

        contextBridge.broadcastMessage('log', {data: entity});

        // const browsers = GameLoop.getInstance().browsers;
        // if (browsers && browsers.length) {
        //     browsers.map(({ browserWindow }) => browserWindow.webContents.send('log', entity));
        // }
    }
}
