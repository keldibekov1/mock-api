// create-product.dto.ts
import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 14' })
  @IsString()
  name: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Latest Apple smartphone', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/iphone.jpg', required: false })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId: number;
}
