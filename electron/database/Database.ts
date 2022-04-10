import path from 'path';
import { Connection, getConnectionManager } from 'typeorm';
import { defaultStorageFolder } from '../main';
import {
    AlterAccount1645622498304,
    AlterAccount1646219324124,
    AlterBcoin1643829051934,
    CreateAccount1643552406874,
    CreateBcoin1643672519095,
    CreateConfig1643552279546,
    CreateGameAction1643555044764,
    CreateLog1643552491184,
    CreateNewMap1643893646832,
    InsertGameLoop1646050793856,
    InsertGameLoop1646052787862,
} from './migrations';
import Account from './models/account.model';
import Bcoin from './models/bcoin.model';
import Config from './models/config.model';
import GameAction from './models/game-action.model';
import Log from './models/log.model';
import Map from './models/map.model';
import { LogSubscriber } from './subscribe/log';

export default class Database {
    public connection: Connection;
    static instance: Database;

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
                entities: [Config, Log, Account, GameAction, Bcoin, Map],
                migrations: [
                    CreateConfig1643552279546,
                    CreateAccount1643552406874,
                    CreateLog1643552491184,
                    CreateGameAction1643555044764,
                    CreateBcoin1643672519095,
                    AlterBcoin1643829051934,
                    CreateNewMap1643893646832,
                    AlterAccount1645622498304,
                    InsertGameLoop1646050793856,
                    InsertGameLoop1646052787862,
                    AlterAccount1646219324124,
                ],
                subscribers: [LogSubscriber],
                migrationsRun: true,
                synchronize: false,
            });
        }

        try {
            this.connection = connectionManager.get('sqlite');
            await this.connection.connect();
        } catch (error: any) {
            console.log(typeof error, 'database');
            console.log(error, 'database');
            // alert(`Erro no banco de dados ${error.message}`);
        }
    }
    public close() {
        return this.connection.close();
    }
    public getRepository<T>(name: string) {
        return this.connection.getRepository<T>(name);
    }
}
