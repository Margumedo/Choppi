import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMushroomImage1764214621000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Fix image path for 'Champiñones Laminados'
        // Using SKU 'ENL-CHA-001' from seed data
        await queryRunner.query(
            `UPDATE "products" SET "image" = '/products/champinones.jpg' WHERE "sku" = 'ENL-CHA-001'`
        );
        
        // Fallback: Update by name just in case SKU is different or for the other mushroom product if it exists
        await queryRunner.query(
            `UPDATE "products" SET "image" = '/products/champinones.jpg' WHERE "name" ILIKE '%champiñones%' AND "image" LIKE '%champiñones.jpg'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert changes (optional, but good practice)
        // Note: We can't easily revert to "whatever it was before" without knowing it, 
        // but we can set it back to the 'broken' path if we wanted to strictly reverse.
        // In this case, we'll leave it as is or set it back to the old path.
        await queryRunner.query(
            `UPDATE "products" SET "image" = '/products/champiñones.jpg' WHERE "sku" = 'ENL-CHA-001'`
        );
    }

}

