import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { StoreProduct } from '../store-products/entities/store-product.entity';
import { QuoteCartDto } from './dto/quote-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(StoreProduct)
        private readonly storeProductRepository: Repository<StoreProduct>,
    ) { }

    async quote(quoteCartDto: QuoteCartDto) {
        const ids = quoteCartDto.items.map((item) => item.storeProductId);
        const storeProducts = await this.storeProductRepository.find({
            where: { id: In(ids) },
            relations: ['product'],
        });

        let subtotal = 0;
        const itemsDetails = [];

        for (const item of quoteCartDto.items) {
            const storeProduct = storeProducts.find((sp) => sp.id === item.storeProductId);
            if (!storeProduct) {
                throw new NotFoundException(`Product with ID ${item.storeProductId} not found`);
            }

            const lineTotal = Number(storeProduct.price) * item.quantity;
            subtotal += lineTotal;

            itemsDetails.push({
                storeProductId: storeProduct.id,
                productName: storeProduct.product.name,
                price: Number(storeProduct.price),
                quantity: item.quantity,
                lineTotal,
            });
        }

        return {
            subtotal,
            items: itemsDetails,
        };
    }
}
