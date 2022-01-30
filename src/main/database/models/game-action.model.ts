import 'reflect-metadata'; // Required by TypoORM.
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GameAction')
export default class Log {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    name: string;

    @Column({ name: 'file_name' })
    fileName: string;

    @Column({ name: 'start_time', nullable: true })
    startTime?: number;

    @Column('integer')
    time: number;

    @CreateDateColumn()
    created: Date;
}
