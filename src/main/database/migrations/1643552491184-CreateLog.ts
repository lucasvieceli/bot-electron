import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLog1643552491184 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Log" (
                "id"	integer NOT NULL,
                "message"	varchar NOT NULL,
                "created"	datetime NOT NULL DEFAULT (datetime('now')),
                "params"	varchar,
                "account_id"	integer,
                PRIMARY KEY("id" AUTOINCREMENT)
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
