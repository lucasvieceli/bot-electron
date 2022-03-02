import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { win } from '../..';
import { GameLoop } from '../../service/game-api/game-loop.class';
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

        const browsers = GameLoop.getInstance().browsers;
        if (browsers && browsers.length) {
            browsers.map(({ browserWindow }) => browserWindow.webContents.send('log', entity));
        }
    }
}
