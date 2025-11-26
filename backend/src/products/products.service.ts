import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(createProductDto: CreateProductDto) {
        try {
            const product = this.productRepository.create(createProductDto);
            return await this.productRepository.save(product);
        } catch (error) {
            if (error.code === '23505') { // Unique violation
                throw new ConflictException('Product with this SKU already exists');
            }
            throw error;
        }
    }

    async findAll() {
        return this.productRepository.find();
    }

    async findOne(id: string) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
        return product;
    }



    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        this.productRepository.merge(product, updateProductDto);
        return this.productRepository.save(product);
    }

    async remove(id: string) {
        const product = await this.findOne(id);
        return this.productRepository.softRemove(product);
    }
}
