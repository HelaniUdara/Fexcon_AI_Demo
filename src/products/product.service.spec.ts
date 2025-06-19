import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

const mockProduct = {
  name: 'Test Watch',
  description: 'A luxury test watch',
  pictureUrl: 'https://example.com/watch.jpg',
  price: 999.99,
  stockQuantity: 5,
  status: ProductStatus.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductService', () => {
  let service: ProductService;
  let repo: Repository<Product>;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  afterEach(() => jest.clearAllMocks());

  it('should create a product', async () => {
    const dto: CreateProductDto = { ...mockProduct };

    mockRepo.create.mockReturnValue(dto);
    mockRepo.save.mockResolvedValue(mockProduct);

    const result = await service.createProduct(dto);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockRepo.save).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockProduct);
  });

  it('should return all products', async () => {
    mockRepo.find.mockResolvedValue([mockProduct]);
    const result = await service.getAllProducts();
    expect(mockRepo.find).toHaveBeenCalled();
    expect(result).toEqual([mockProduct]);
  });

  it('should return product by id', async () => {
    mockRepo.findOneBy.mockResolvedValue(mockProduct);
    const result = await service.getProductById(1);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(mockProduct);
  });

it('should throw NotFoundException if product is not found', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    await expect(service.getProductById(1)).rejects.toThrow(NotFoundException);
});

it('should update a product', async () => {
    const dto: UpdateProductDto = { name: 'Updated Watch' };
    const updatedProduct = { ...mockProduct, ...dto };

    mockRepo.findOneBy.mockResolvedValue(mockProduct);
    mockRepo.save.mockResolvedValue(updatedProduct);

    const result = await service.updateProduct(1, dto);
    expect(result).toEqual(updatedProduct);
});

it('should throw NotFoundException when updating a non-existent product', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    const dto: UpdateProductDto = { name: 'Invalid Update' };
    await expect(service.updateProduct(999, dto)).rejects.toThrow(NotFoundException);
});

it('should not update product if invalid data is provided', async () => {
    // Simulate invalid data by not providing required fields
    const dto: UpdateProductDto = { name: '' }; // Assuming name cannot be empty
    mockRepo.findOneBy.mockResolvedValue(mockProduct);
    // Simulate TypeORM validation error or just return the same product for this mock
    mockRepo.save.mockImplementation(() => { throw new Error('Invalid data'); });
    await expect(service.updateProduct(1, dto)).rejects.toThrow('Invalid data');
});

it('should change product status', async () => {
    const status = ProductStatus.INACTIVE;
    const updatedProduct = { ...mockProduct, status };

    mockRepo.findOneBy.mockResolvedValue(mockProduct);
    mockRepo.save.mockResolvedValue(updatedProduct);

    const result = await service.changeProductStatus(1, status);
    expect(result.status).toBe(ProductStatus.INACTIVE);
});

it('should throw NotFoundException when changing status of non-existent product', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    await expect(service.changeProductStatus(999, ProductStatus.INACTIVE)).rejects.toThrow(NotFoundException);
});
});
