import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './product.entity';

export interface IProductService {
  createProduct(dto: CreateProductDto): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product>;
  updateProduct(id: number, dto: UpdateProductDto): Promise<Product>;
  changeProductStatus(id: number, status: Product['status']): Promise<Product>;
}