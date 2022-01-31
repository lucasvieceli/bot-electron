import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import Account from './account.model';

@Entity('Config')
export default class Config {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @ManyToOne(() => Account, (account) => account.configs, { nullable: true })
    @JoinColumn({ name: 'account_id' })
    account?: Account | number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}
