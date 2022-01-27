import path from 'path';
import { Connection, getConnectionManager } from 'typeorm';
import { defaultStorageFolder } from '..';
import { Config1643217018480 } from './migrations/1643217018480-Config';
import Config from './models/config';
import Log from './models/log';
import { LogSubscriber } from './subscribe/log';

export default class Database {
    public connection: Connection;

    constructor() {}

    public async init(): Promise<void> {
        const connectionManager = getConnectionManager();

        if (!connectionManager.has('sqlite')) {
            connectionManager.create({
                name: 'sqlite',
                type: 'sqlite',
                database: path.join(defaultStorageFolder, 'bot_database.sqlite'),
                entities: [Config, Log],
                migrations: [Config1643217018480],
                subscribers: [LogSubscriber],
                migrationsRun: true,
                synchronize: true,
            });
        }

        try {
            this.connection = connectionManager.get('sqlite');
            await this.connection.connect();
        } catch (error) {
            console.log(error);
        }
    }
    public close() {
        this.connection.close();
    }
    public getRepository<T>(name: string) {
        return this.connection.getRepository<T>(name);
    }
}
