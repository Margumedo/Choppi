import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddGoogleAuthSupport1732665000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add googleId column
        await queryRunner.addColumn('users', new TableColumn({
            name: 'googleId',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
        }));

        // Make password nullable (for Google OAuth users)
        await queryRunner.changeColumn('users', 'password', new TableColumn({
            name: 'password',
            type: 'varchar',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove googleId column
        await queryRunner.dropColumn('users', 'googleId');

        // Make password required again
        await queryRunner.changeColumn('users', 'password', new TableColumn({
            name: 'password',
            type: 'varchar',
            isNullable: false,
        }));
    }
}
