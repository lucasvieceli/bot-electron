import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertGameLoop1646052787862 implements MigrationInterface {
    name = 'InsertGameLoop1646052787862';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO "GameAction" ("name", "file_name", "class_name", "start_time", "loop", "config_time", "order") VALUES ('Login início', 'login', 'Login', '0', '0', '', '0');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
