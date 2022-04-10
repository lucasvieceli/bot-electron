import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGameAction1643555044764 implements MigrationInterface {
    name = 'CreateGameAction1643555044764';
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
            INSERT INTO "GameAction" ("name", "file_name", "class_name", "start_time", "loop", "config_time", "order") VALUES ('Verifica login', 'login', 'Login', '0', '1', 'interval-check-login', '1');
        `);
        await queryRunner.query(`
            INSERT INTO "GameAction" ("name", "file_name", "class_name", "start_time", "loop", "config_time", "order") VALUES ('Register BCOIN', 'register-bcoin', 'RegisterBcoin', '0', '1', 'interval-bcoin', '2');
        `);
        await queryRunner.query(`
            INSERT INTO "GameAction" ("name", "file_name", "class_name", "start_time", "loop", "config_time", "order") VALUES ('Verifica heróis', 'check-heroes', 'CheckHeroes', '0', '1', 'interval-work', '3');
        `);
        await queryRunner.query(`
            INSERT INTO "GameAction" ("name", "file_name", "class_name", "start_time", "loop", "config_time", "order") VALUES ('Verifica novo mapa', 'new-map', 'NewMap', '0', '1', '', '4');
        `);
        await queryRunner.query(`
            INSERT INTO "GameAction" ("name", "file_name", "class_name", "start_time", "loop", "config_time", "order") VALUES ('Recarrega posições', 'refresh-heroes', 'RefreshHeroes', '1', '1', 'interval-refresh-heroes', '5');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
