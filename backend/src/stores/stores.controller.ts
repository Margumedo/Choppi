import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
    constructor(private readonly storesService: StoresService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new store' })
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storesService.create(createStoreDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all stores with pagination and search' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'q', required: false, type: String, description: 'Search by name' })
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
        @Query('q') search?: string,
    ) {
        return this.storesService.findAll(Number(page), Number(limit), search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a store by ID' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.storesService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a store' })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStoreDto: UpdateStoreDto) {
        return this.storesService.update(id, updateStoreDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a store (soft delete)' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.storesService.remove(id);
    }
}
