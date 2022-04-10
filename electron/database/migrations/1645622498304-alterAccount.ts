import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAccount1645622498304 implements MigrationInterface {
    name = 'AlterAccount1645622498304';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE Account ADD user varchar null;
        `);
        await queryRunner.query(`
        ALTER TABLE Account ADD password varchar null;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
