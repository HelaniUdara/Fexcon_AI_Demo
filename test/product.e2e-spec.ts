import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../src/products/product.module';
import { Product } from '../src/products/product.entity';
import { ProductStatus } from '../src/products/product.entity';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;

  const createDto = {
    name: 'Test Watch',
    description: 'An elegant test watch',
    pictureUrl: 'https://example.com/test-watch.jpg',
    price: 2500.00,
    stockQuantity: 20,
    status: ProductStatus.ACTIVE,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT ?? '5432', 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [Product],
          synchronize: true,
        }),
        ProductModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('POST /products → should create a product', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .send(createDto)
      .expect(201);

    expect(res.body).toMatchObject({
      name: createDto.name,
      price: createDto.price,
      status: ProductStatus.ACTIVE,
    });

    createdId = res.body.id;
    expect(createdId).toBeDefined();
  });

  it('GET /products → should return an array of products', async () => {
    const res = await request(app.getHttpServer()).get('/products').expect(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /products/:id → should return a specific product', async () => {
    const res = await request(app.getHttpServer())
      .get(`/products/${createdId}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
    expect(res.body.name).toBe(createDto.name);
  });

  it('POST /products/:id → should update product details', async () => {
    const updateDto = {
      name: 'Updated Watch',
      price: 2800,
    };

    const res = await request(app.getHttpServer())
      .post(`/products/${createdId}`)
      .send(updateDto)
      .expect(201);

    expect(res.body.name).toBe(updateDto.name);
    expect(res.body.price).toBe(updateDto.price);
  });

  it('PATCH /products/:id/status → should toggle product status', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/products/${createdId}/status`)
      .send({ status: ProductStatus.INACTIVE })
      .expect(200);

    expect(res.body.status).toBe(ProductStatus.INACTIVE);
  });
});
