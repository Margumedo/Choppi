import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Put, ParseBoolPipe } from '@nestjs/common';
import { StoreProductsService } from './store-products.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('store-products')
@Controller('stores/:storeId/products')
export class StoreProductsController {
    constructor(private readonly storeProductsService: StoreProductsService) { }

    @Post()
    @ApiOperation({ summary: 'Add a product to a store' })
    create(
        @Param('storeId', ParseUUIDPipe) storeId: string,
        @Body() createStoreProductDto: CreateStoreProductDto,
    ) {
        return this.storeProductsService.create(storeId, createStoreProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'List products in a store' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'q', required: false, type: String, description: 'Search by product name' })
    @ApiQuery({ name: 'inStock', required: false, type: Boolean })
    findAll(
        @Param('storeId', ParseUUIDPipe) storeId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
        @Query('q') search?: string,
        @Query('inStock') inStock?: string,
    ) {
        const inStockBool = inStock === 'true';
        return this.storeProductsService.findAll(storeId, Number(page), Number(limit), search, inStockBool);
    }

    @Put(':storeProductId')
    @ApiOperation({ summary: 'Update price or stock of a product in a store' })
    update(
        @Param('storeProductId', ParseUUIDPipe) storeProductId: string,
        @Body() updateStoreProductDto: UpdateStoreProductDto,
    ) {
        return this.storeProductsService.update(storeProductId, updateStoreProductDto);
    }

    @Delete(':storeProductId')
    @ApiOperation({ summary: 'Remove a product from a store' })
    remove(@Param('storeProductId', ParseUUIDPipe) storeProductId: string) {
        return this.storeProductsService.remove(storeProductId);
    }
}
