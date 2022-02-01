import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConfig1643552279546 implements MigrationInterface {
    name = 'CreateConfig1643552279546';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Config" (
                "id"	INTEGER NOT NULL,
                "name"	VARCHAR NOT NULL,
                "value"	VARCHAR,
                "account_id"	INTEGER,
                "created"	DATETIME NOT NULL DEFAULT (datetime('now')),
                "updated"	DATETIME,
                PRIMARY KEY("id" AUTOINCREMENT)
            );`,
        );
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('interval-work', '10')`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('interval-refresh-heroes', '5');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('interval-check-login', '5');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-default', '0.7');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-hero-common', '0.8');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-hero-rare', '0.8');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-hero-super-rare', '0.8');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-hero-epic', '0.8');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-hero-legend', '0.8');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-hero-super-legend', '0.8');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-button-metamask', '0.8');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-button-work', '0.9');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('threshold-bar-life', '0.85');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('new-map-enable', '0');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('new-map-hero-common', '0');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('new-map-hero-rare', '0');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('new-map-hero-super-rare', '0');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('new-map-hero-epic', '0');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('new-map-hero-legend', '0');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('new-map-hero-super-legend', '0');`);
        await queryRunner.query(`INSERT INTO "Config" (name, value) values('new-map-time', '2');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
