import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccount1643552406874 implements MigrationInterface {
    name = 'CreateAccount1643552406874';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Account" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                "metamask_id" varchar NOT NULL,
                "name" varchar NULL, 
                "created" datetime NOT NULL DEFAULT (datetime('now'))
                )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
