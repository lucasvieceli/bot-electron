import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGameAction1643555044764 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "GameAction" (
            "id"	INTEGER NOT NULL,
            "name"	VARCHAR NOT NULL,
            "file_name"	VARCHAR NOT NULL,
            "start_time"	INTEGER,
            "time"	INTEGER NOT NULL,
            "created"	DATETIME NOT NULL DEFAULT 'datetime(''now'')',
            PRIMARY KEY("id")
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
