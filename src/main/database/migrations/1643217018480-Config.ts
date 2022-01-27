import { MigrationInterface, QueryRunner } from 'typeorm';

export class Config1643217018480 implements MigrationInterface {
    name = 'Config1643217018480';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "main"."Config" ("id", "intervalWork", "intervalRefreshHeroes", "intervalCheckLogin", "thresholdDefault", "thresholdHeroCommon", "thresholdHeroRare", "thresholdHeroSuperRare", "thresholdHeroEpic", "thresholdHeroLegend", "thresholdHeroSuperLegend", "thresholdButtonMetamask", "thresholdButtonWork", "thresholdBarLife", "newMapEnable", "newMapHeroCommon", "newMapHeroRare", "newMapHeroSuperRare", "newMapHeroEpic", "newMapHeroLegend", "newMapHeroSuperLegend", "newMapTime") VALUES ('config', '10', '5', '5', '0.7', '0.8', '0.8', '0.8', '0.8', '0.8', '0.8', '0.8', '0.9', '0.9', '0', '0', '0', '0', '0', '0', '0', '2');`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
