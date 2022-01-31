import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGameAction1643555044764 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "GameAction" (
            "id"	INTEGER NOT NULL,
            "name"	VARCHAR NOT NULL,
            "file_name"	VARCHAR NOT NULL,
            "class_name"	VARCHAR NOT NULL,
            "start_time"	INTEGER,
            "loop"	INTEGER NOT NULL,
            "config_time"	VARCHAR,
            "order"	INTEGER NOT NULL,
            "created"	DATETIME NOT NULL DEFAULT (datetime('now')),
            PRIMARY KEY("id")
        );
        `);
        await queryRunner.query(`
        INSERT INTO "GameAction" ("id", "name", "file_name", "class_name", "start_time", "loop",  "order") VALUES ('1', 'Busca id metamask', 'metamask-id', 'MetamaskId', '0', '0', '0');
        `);
        await queryRunner.query(`
        INSERT INTO "GameAction" ("name", "file_name", "class_name", "start_time", "loop", "config_time", "order") VALUES ('Verifica login', 'login', 'Login', '0', '1', 'interval-check-login', '0');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
