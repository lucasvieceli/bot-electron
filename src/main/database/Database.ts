import path from 'path';
import { Connection, getConnectionManager } from 'typeorm';
import { defaultStorageFolder } from '..';
import {
    AlterBcoin1643829051934,
    CreateAccount1643552406874,
    CreateBcoin1643672519095,
    CreateConfig1643552279546,
    CreateGameAction1643555044764,
    CreateLog1643552491184,
} from './migrations';
import Account from './models/account.model';
import Bcoin from './models/bcoin.model';
import Config from './models/config.model';
import GameAction from './models/game-action.model';
import Log from './models/log.model';
import { LogSubscriber } from './subscribe/log';

export default class Database {
    public connection: Connection;
    static instance: Database;

    constructor() {}

    static getInstance() {
        if (Database.instance) return Database.instance;

        Database.instance = new Database();
        return Database.instance;
    }

    public async init(): Promise<void> {
        const connectionManager = getConnectionManager();

        if (!connectionManager.has('sqlite')) {
            connectionManager.create({
                name: 'sqlite',
                type: 'sqlite',
                database: path.join(defaultStorageFolder, 'bot_database.sqlite'),
                entities: [Config, Log, Account, GameAction, Bcoin],
                migrations: [
                    CreateConfig1643552279546,
                    CreateAccount1643552406874,
                    CreateLog1643552491184,
                    CreateGameAction1643555044764,
                    CreateBcoin1643672519095,
                    AlterBcoin1643829051934,
                ],
                subscribers: [LogSubscriber],
                migrationsRun: true,
                synchronize: false,
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
