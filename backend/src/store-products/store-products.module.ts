import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProductsService } from './store-products.service';
import { StoreProductsController } from './store-products.controller';
import { StoreProduct } from './entities/store-product.entity';
import { Product } from '../products/entities/product.entity';
import { Store } from '../stores/entities/store.entity';

@Module({
    imports: [TypeOrmModule.forFeature([StoreProduct, Product, Store])],
    controllers: [StoreProductsController],
    providers: [StoreProductsService],
    exports: [StoreProductsService],
})
export class StoreProductsModule { }
