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
    const store1 = await storesService.create({ name: 'Supermercado Central', address: 'Av. Principal 123' });
    const store2 = await storesService.create({ name: 'Tienda de Barrio', address: 'Calle 456' });
    console.log('Stores created');

    // Create Products
    const product1 = await productsService.create({ name: 'Coca Cola 1.5L', sku: 'COCA-1.5', description: 'Refresco sabor cola' });
    const product2 = await productsService.create({ name: 'Arroz 1kg', sku: 'ARROZ-1', description: 'Arroz blanco grado 1' });
    const product3 = await productsService.create({ name: 'Leche Entera', sku: 'LECHE-1', description: 'Leche entera 1L' });
    console.log('Products created');

    // Create Store Products
    await storeProductsService.create(store1.id, { productId: product1.id, price: 15.50, stock: 100 });
    await storeProductsService.create(store1.id, { productId: product2.id, price: 10.00, stock: 50 });

    await storeProductsService.create(store2.id, { productId: product1.id, price: 16.00, stock: 80 });
    await storeProductsService.create(store2.id, { productId: product3.id, price: 12.00, stock: 20 });
    console.log('Store Products created');

    await app.close();
}
bootstrap();
