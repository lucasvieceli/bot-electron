import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBcoin1643672519095 implements MigrationInterface {
    name = 'CreateBcoin1643672519095';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Bcoin" (
                "id"	integer NOT NULL,
                "qty"	number NOT NULL,
                "created"	datetime NOT NULL DEFAULT (datetime('now')),
                "account_id"	integer,
                PRIMARY KEY("id" AUTOINCREMENT)
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
