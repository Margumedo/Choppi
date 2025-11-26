
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    console.log('🧨 Starting HARD RESET of products...');

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // 1. Delete all StoreProducts (Inventory)
        console.log('   - Deleting all inventory (store_products)...');
        await queryRunner.query(`DELETE FROM store_products`);

        // 2. Delete all Products (Catalog)
        console.log('   - Deleting all products (products)...');
        await queryRunner.query(`DELETE FROM products`);

        await queryRunner.commitTransaction();
        console.log('✅ HARD RESET finished successfully! Database is clean.');

    } catch (err) {
        console.error('❌ Error during reset:', err);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
        await app.close();
    }
}

bootstrap();
