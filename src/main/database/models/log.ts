import {
    AfterInsert,
    AfterLoad,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Log')
export default class Log {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    message: string;

    @CreateDateColumn()
    created: Date;

    @Column({ type: 'varchar', nullable: true })
    params: string | { [key: string]: string };

    @BeforeInsert()
    paramsToString() {
        this.params = JSON.stringify(this.params);
    }

    @AfterLoad()
    @AfterInsert()
    paramsToJson() {
        console.log('aquiii');
        this.params = JSON.parse(this.params as string);
    }
}
