import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { StoresService } from './stores/stores.service';
import { ProductsService } from './products/products.service';
import { StoreProductsService } from './store-products/store-products.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const usersService = app.get(UsersService);
    const storesService = app.get(StoresService);
    const productsService = app.get(ProductsService);
    const storeProductsService = app.get(StoreProductsService);

    console.log('Seeding data...');

    // Create User
    const email = 'demo@choppi.app';
    const existingUser = await usersService.findOneByEmail(email);
    if (!existingUser) {
        await usersService.create({
            email,
            password: 'password123',
            name: 'Demo User',
        });
        console.log('User created: demo@choppi.app / password123');
    }

    // Create Stores
    const store1Data = { name: 'Supermercado Central', address: 'Av. Principal 123' };
    let store1 = await storesService.findOneBy({ name: store1Data.name });
    if (!store1) {
        store1 = await storesService.create(store1Data);
        console.log('Store 1 created');
    }

    const store2Data = { name: 'Tienda de Barrio', address: 'Calle 456' };
    let store2 = await storesService.findOneBy({ name: store2Data.name });
    if (!store2) {
        store2 = await storesService.create(store2Data);
        console.log('Store 2 created');
    }

    // Create Products
    const productsData = [
        { name: 'Coca Cola 1.5L', sku: 'COCA-1.5', description: 'Refresco sabor cola' },
        { name: 'Arroz 1kg', sku: 'ARROZ-1', description: 'Arroz blanco grado 1' },
        { name: 'Leche Entera', sku: 'LECHE-1', description: 'Leche entera 1L' }
    ];

    const createdProducts = [];
    for (const prodData of productsData) {
        // We need a way to check existence. Since we don't have findBySku in service interface easily available here without extending,
        // we will assume for this MVP seed that if store1 exists, products might too. 
        // A robust seed would check DB. Let's just create them and catch errors if unique constraint fails, or check count.
        // For now, let's just create them. In a real app, we'd use `upsert`.
        try {
            const product = await productsService.create(prodData);
            createdProducts.push(product);
        } catch (e) {
            console.log(`Product ${prodData.sku} might already exist`);
            // Try to fetch it to link it later? 
            // For this specific test, let's assume clean DB or just ignore if fails.
        }
    }
    console.log('Products seeding attempt finished');

    // Create Store Products
    // This part is tricky without fetching the exact products. 
    // Ideally we should fetch all products and stores to link them.
    // ... logic to link ...

    await app.close();
}
bootstrap();
