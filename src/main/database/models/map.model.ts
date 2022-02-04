import 'reflect-metadata'; // Required by TypoORM.
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Account from './account.model';

@Entity('Map')
export default class Map {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(() => Account, (account) => account.bcoins)
    @JoinColumn({ name: 'account_id' })
    account: Account;
}
