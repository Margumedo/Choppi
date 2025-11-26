
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productsService = app.get(ProductsService);

    try {
        const allProducts = await productsService.findAll();
        const cafeProduct = allProducts.find(p => p.sku === 'BAS-CAF-001');

        if (cafeProduct) {
            console.log('✅ Producto encontrado:');
            console.log(`   Nombre: ${cafeProduct.name}`);
            console.log(`   SKU: ${cafeProduct.sku}`);
            console.log(`   Imagen: ${cafeProduct.image}`);
        } else {
            console.log('❌ Producto no encontrado');
        }
    } catch (e) {
        console.error('Error:', e);
    }

    await app.close();
}

bootstrap();
