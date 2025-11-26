
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';
import { StoreProductsService } from './store-products/store-products.service';
import { DataSource } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productsService = app.get(ProductsService);
    const dataSource = app.get(DataSource);

    const legacySkus = ['PEP-COL-001', 'PEP-LIG-001', 'PEP-QUA-001'];

    console.log('🗑️ Starting cleanup of legacy products...');

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // 1. Find products by SKU
        const products = await dataSource.query(
            `SELECT * FROM products WHERE sku IN ('${legacySkus.join("','")}')`
        );

        if (products.length === 0) {
            console.log('ℹ️ No legacy products found to delete.');
        } else {
            for (const product of products) {
                console.log(`🔍 Processing legacy product: ${product.name} (${product.sku})`);

                // 2. Soft delete StoreProducts (inventory)
                await queryRunner.query(
                    `UPDATE store_products SET "deletedAt" = NOW() WHERE "productId" = '${product.id}'`
                );
                console.log(`   - Soft deleted store associations.`);

                // 3. Soft delete Product
                await queryRunner.query(
                    `UPDATE products SET "deletedAt" = NOW() WHERE id = '${product.id}'`
                );
                console.log(`   - Soft deleted product.`);
            }
        }

        await queryRunner.commitTransaction();
        console.log('✅ Cleanup finished successfully!');

    } catch (err) {
        console.error('❌ Error during cleanup:', err);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
        await app.close();
    }
}

bootstrap();
