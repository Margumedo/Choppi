
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productsService = app.get(ProductsService);

    try {
        const allProducts = await productsService.findAll();
        const pepsiProducts = allProducts.filter(p => p.name.toLowerCase().includes('pepsi'));

        console.log('Found Pepsi Products:', pepsiProducts.map(p => ({
            name: p.name,
            sku: p.sku,
            image: p.image,
            id: p.id
        })));
    } catch (e) {
        console.error('Error finding products:', e);
    }

    await app.close();
}

bootstrap();
