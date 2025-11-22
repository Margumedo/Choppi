import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
    ) { }

    async create(createStoreDto: CreateStoreDto) {
        const store = this.storeRepository.create(createStoreDto);
        return this.storeRepository.save(store);
    }

    async findAll(page: number = 1, limit: number = 20, search?: string) {
        const skip = (page - 1) * limit;
        const where = search ? { name: ILike(`%${search}%`) } : {};

        const [data, total] = await this.storeRepository.findAndCount({
            where,
            take: limit,
            skip,
            order: { createdAt: 'DESC' },
        });

        return {
            data,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const store = await this.storeRepository.findOne({ where: { id } });
        if (!store) throw new NotFoundException(`Store with ID ${id} not found`);
        return store;
    }

    async update(id: string, updateStoreDto: UpdateStoreDto) {
        const store = await this.findOne(id);
        this.storeRepository.merge(store, updateStoreDto);
        return this.storeRepository.save(store);
    }

    async remove(id: string) {
        const store = await this.findOne(id);
        return this.storeRepository.softRemove(store);
    }
}
