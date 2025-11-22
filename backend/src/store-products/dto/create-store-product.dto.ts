import { IsUUID, IsNumber, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreProductDto {
    @ApiProperty({ example: 'uuid-of-product' })
    @IsUUID()
    productId: string;

    @ApiProperty({ example: 10.50 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: 100 })
    @IsInt()
    @Min(0)
    stock: number;
}
