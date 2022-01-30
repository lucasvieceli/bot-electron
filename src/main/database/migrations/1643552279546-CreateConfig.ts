import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConfig1643552279546 implements MigrationInterface {
    name = 'CreateConfig1643552279546';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Config" ("id" varchar PRIMARY KEY NOT NULL, "intervalWork" varchar NOT NULL, "intervalRefreshHeroes" varchar NOT NULL, "intervalCheckLogin" varchar NOT NULL, "thresholdDefault" varchar NOT NULL, "thresholdHeroCommon" varchar NOT NULL, "thresholdHeroRare" varchar NOT NULL, "thresholdHeroSuperRare" varchar NOT NULL, "thresholdHeroEpic" varchar NOT NULL, "thresholdHeroLegend" varchar NOT NULL, "thresholdHeroSuperLegend" varchar NOT NULL, "thresholdButtonMetamask" varchar NOT NULL, "thresholdButtonWork" varchar NOT NULL, "thresholdBarLife" varchar NOT NULL, "newMapEnable" varchar NOT NULL, "newMapHeroCommon" varchar NOT NULL, "newMapHeroRare" varchar NOT NULL, "newMapHeroSuperRare" varchar NOT NULL, "newMapHeroEpic" varchar NOT NULL, "newMapHeroLegend" varchar NOT NULL, "newMapHeroSuperLegend" varchar NOT NULL, "newMapTime" varchar NOT NULL)`,
        );
        await queryRunner.query(
            `INSERT INTO "Config" ("id", "intervalWork", "intervalRefreshHeroes", "intervalCheckLogin", "thresholdDefault", "thresholdHeroCommon", "thresholdHeroRare", "thresholdHeroSuperRare", "thresholdHeroEpic", "thresholdHeroLegend", "thresholdHeroSuperLegend", "thresholdButtonMetamask", "thresholdButtonWork", "thresholdBarLife", "newMapEnable", "newMapHeroCommon", "newMapHeroRare", "newMapHeroSuperRare", "newMapHeroEpic", "newMapHeroLegend", "newMapHeroSuperLegend", "newMapTime") VALUES ('config', '10', '5', '5', '0.7', '0.8', '0.8', '0.8', '0.8', '0.8', '0.8', '0.8', '0.9', '0.9', '0', '0', '0', '0', '0', '0', '0', '2');`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
