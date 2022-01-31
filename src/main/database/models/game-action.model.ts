import 'reflect-metadata'; // Required by TypoORM.
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GameAction')
export default class GameAction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'file_name' })
    fileName: string;

    @Column({ name: 'class_name' })
    className: string;

    @Column({ name: 'start_time', nullable: true })
    startTime?: number;

    @Column({ name: 'loop' })
    loop?: number;

    @Column('integer')
    time: number;

    @Column('integer')
    order: number;

    @CreateDateColumn()
    created: Date;
}
