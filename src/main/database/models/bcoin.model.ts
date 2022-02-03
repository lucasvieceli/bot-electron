import 'reflect-metadata'; // Required by TypoORM.
import {
    AfterInsert,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BcoinService } from '../../service';
import Database from '../Database';
import Account from './account.model';

@Entity('Bcoin')
export default class Bcoin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qty: number;

    @Column({ name: 'qty_day' })
    qtyDay: number;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(() => Account, (account) => account.bcoins)
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @BeforeInsert()
    @BeforeUpdate()
    async insertQtyDay() {
        const repo = Database.getInstance().getRepository<Bcoin>('Bcoin');
        const id = this.id;
        let account = this.account;
        if (!account) {
            const bcoin = await repo.findOne(this.id, { relations: ['account'] });
            account = bcoin.account;
        }

        this.qtyDay = await BcoinService.getBcoinDay(this.qty, account, id);
    }
}
