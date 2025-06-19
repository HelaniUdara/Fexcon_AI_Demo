import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { IProductService } from './product.service.interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.getProductById(id);
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async changeProductStatus(id: number, status: ProductStatus): Promise<Product> {
    const product = await this.getProductById(id);
    product.status = status;
    return this.productRepo.save(product);
  }
}