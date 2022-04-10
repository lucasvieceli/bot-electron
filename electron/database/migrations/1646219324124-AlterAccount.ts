import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAccount1646219324124 implements MigrationInterface {
    name = 'AlterAccount1646219324124';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE Account ADD enable number null DEFAULT 1;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
