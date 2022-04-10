import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertGameLoop1646050793856 implements MigrationInterface {
    name = 'InsertGameLoop1646050793856';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO "GameAction" ("name", "file_name", "class_name", "start_time", "loop", "config_time", "order") VALUES ('Verificar erro ', 'error-button', 'ErrorButton', '0', '1', '', '6');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
