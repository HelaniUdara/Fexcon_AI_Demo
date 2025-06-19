import { IsString, IsNumber, IsUrl, IsEnum, IsInt, Min, MaxLength } from 'class-validator';
import { ProductStatus } from '../product.entity';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  pictureUrl: string;

  @IsNumber()
  price: number;

  @IsInt()
  @Min(0)
  stockQuantity: number;

  @IsEnum(ProductStatus)
  status: ProductStatus;
}