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

@Entity('Log')
export default class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @CreateDateColumn()
    created: Date;

    @Column({ type: 'varchar', nullable: true })
    params: string | { [key: string]: string };

    @ManyToOne(() => Account, (account) => account.logs, { nullable: true })
    @JoinColumn({ name: 'account_id' })
    account?: Account;

    @BeforeInsert()
    paramsToString() {
        this.params = JSON.stringify(this.params);
    }

    @AfterLoad()
    @AfterInsert()
    paramsToJson() {
        this.params = JSON.parse(this.params as string);
    }
}
