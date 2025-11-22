import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { StoreProduct } from './entities/store-product.entity';
import { Product } from '../products/entities/product.entity';
import { Store } from '../stores/entities/store.entity';

@Injectable()
export class StoreProductsService {
    constructor(
        @InjectRepository(StoreProduct)
        private readonly storeProductRepository: Repository<StoreProduct>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
    ) { }

    async create(storeId: string, createStoreProductDto: CreateStoreProductDto) {
        // Verify store exists
        const store = await this.storeRepository.findOne({ where: { id: storeId } });
        if (!store) throw new NotFoundException(`Store with ID ${storeId} not found`);

        // Verify product exists
        const product = await this.productRepository.findOne({ where: { id: createStoreProductDto.productId } });
        if (!product) throw new NotFoundException(`Product with ID ${createStoreProductDto.productId} not found`);

        // Check if product already exists in store
        const existing = await this.storeProductRepository.findOne({
            where: { storeId, productId: createStoreProductDto.productId },
        });
        if (existing) {
            throw new ConflictException('Product already exists in this store');
        }

        const storeProduct = this.storeProductRepository.create({
            storeId,
            ...createStoreProductDto,
        });
        return this.storeProductRepository.save(storeProduct);
    }

    async findAll(storeId: string, page: number = 1, limit: number = 20, search?: string, inStock?: boolean) {
        const query = this.storeProductRepository.createQueryBuilder('sp')
            .leftJoinAndSelect('sp.product', 'product')
            .where('sp.storeId = :storeId', { storeId });

        if (search) {
            query.andWhere('product.name ILIKE :search', { search: `%${search}%` });
        }

        if (inStock) {
            query.andWhere('sp.stock > 0');
        }

        const skip = (page - 1) * limit;
        query.skip(skip).take(limit).orderBy('sp.createdAt', 'DESC');

        const [data, total] = await query.getManyAndCount();

        return {
            data,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    async update(storeProductId: string, updateStoreProductDto: UpdateStoreProductDto) {
        const storeProduct = await this.storeProductRepository.findOne({ where: { id: storeProductId } });
        if (!storeProduct) throw new NotFoundException(`StoreProduct with ID ${storeProductId} not found`);

        this.storeProductRepository.merge(storeProduct, updateStoreProductDto);
        return this.storeProductRepository.save(storeProduct);
    }

    async remove(storeProductId: string) {
        const storeProduct = await this.storeProductRepository.findOne({ where: { id: storeProductId } });
        if (!storeProduct) throw new NotFoundException(`StoreProduct with ID ${storeProductId} not found`);
        return this.storeProductRepository.softRemove(storeProduct);
    }
}
