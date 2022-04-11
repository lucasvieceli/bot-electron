import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateConfig1649707795766 implements MigrationInterface {

    name = 'CreateConfig1649707795766';
    public async up(queryRunner: QueryRunner): Promise<void> {
          
            await queryRunner.query(`INSERT INTO "Config" (name, value) values('language', 'pt-BR')`);
         
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
