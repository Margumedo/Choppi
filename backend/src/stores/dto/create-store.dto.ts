import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoreDto {
    @ApiProperty({ example: 'Supermercado Central' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: 'Av. Principal 123' })
    @IsString()
    @IsOptional()
    address?: string;
}
