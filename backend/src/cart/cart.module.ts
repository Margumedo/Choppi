import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { StoreProduct } from '../store-products/entities/store-product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([StoreProduct])],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule { }
