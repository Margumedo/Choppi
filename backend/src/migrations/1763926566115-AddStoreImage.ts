import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStoreImage1763926566115 implements MigrationInterface {
    name = 'AddStoreImage1763926566115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "image"`);
    }

}
