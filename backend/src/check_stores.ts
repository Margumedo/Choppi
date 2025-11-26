
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StoresService } from './stores/stores.service';
import { StoreProductsService } from './store-products/store-products.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const storesService = app.get(StoresService);
    const storeProductsService = app.get(StoreProductsService);

    try {
        const storesResult = await storesService.findAll(1, 100); // Get all stores
        const stores = storesResult.data;

        console.log('📊 Tiendas y su inventario:\n');

        for (const store of stores) {
            const productsResult = await storeProductsService.findAll(store.id, 1, 1000);
            console.log(`${store.name}: ${productsResult.meta.total} productos`);
        }
    } catch (e) {
        console.error('Error:', e);
    }

    await app.close();
}

bootstrap();
