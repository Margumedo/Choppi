import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Coca Cola 1.5L' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: 'Refresco sabor cola' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'COCA-1.5' })
    @IsString()
    @IsNotEmpty()
    sku: string;

    @ApiPropertyOptional({ example: 'https://example.com/coca.jpg' })
    @IsString()
    @IsOptional()
    image?: string;
}
