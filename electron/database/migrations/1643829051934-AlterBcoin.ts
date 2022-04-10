import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterBcoin1643829051934 implements MigrationInterface {
    name = 'AlterBcoin1643829051934';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE Bcoin
            ADD qty_day number null;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
