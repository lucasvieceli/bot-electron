import 'reflect-metadata'; // Required by TypoORM.

import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Bcoin from './bcoin.model';
import Config from './config.model';
import Log from './log.model';

@Entity('Account')
export default class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'metamask_id' })
    metamaskId: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created: Date;

    @OneToMany(() => Log, (log) => log.account)
    logs: Log[];

    @OneToMany(() => Config, (config) => config.account)
    configs: Config[];

    @OneToMany(() => Bcoin, (entity) => entity.account)
    bcoins: Bcoin[];
}
