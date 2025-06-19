import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, Inject } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductStatus } from './product.entity';
import { IProductService } from './product.service.interface';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  findAll() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @Post(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Patch(':id/status')
  changeStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: ProductStatus) {
    return this.productService.changeProductStatus(id, status);
  }
}
