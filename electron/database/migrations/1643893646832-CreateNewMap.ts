import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewMap1643893646832 implements MigrationInterface {
    name = 'CreateNewMap1643893646832';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Map" (
                "id"	integer NOT NULL,
                "created"	datetime NOT NULL DEFAULT (datetime('now')),
                "account_id"	integer,
                PRIMARY KEY("id" AUTOINCREMENT)
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
