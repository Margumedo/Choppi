import { IsNumber, IsInt, Min, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStoreProductDto {
    @ApiPropertyOptional({ example: 12.00 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @ApiPropertyOptional({ example: 50 })
    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;
}
