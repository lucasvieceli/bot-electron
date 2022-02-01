import 'reflect-metadata'; // Required by TypoORM.
import {
    AfterInsert,
    AfterLoad,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Account from './account.model';

@Entity('Bcoin')
export default class Bcoin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qty: number;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(() => Account, (account) => account.bcoins)
    @JoinColumn({ name: 'account_id' })
    account: Account | number;
}
