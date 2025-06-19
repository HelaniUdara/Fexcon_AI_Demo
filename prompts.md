### Backend Code generation Prompt:

I'm building a mini e-commerce backend using NestJS and PostgreSQL. I want to create a `Product` module that supports the following API endpoints:

1\. Add product

2\. Get all products

3\. Get product by ID

4\. Change the status (active/inactive)

5\. Edit product details

The product should have these fields:

- id (auto-generated)

- name

- description

- pictureUrl

- price

- stockQuantity

- status (active/inactive)

- createdAt

- updatedAt

Please generate all the required NestJS files:

- product.entity.ts (using TypeORM)

- product.service.ts

- product.service.interface.ts

- product.controller.ts

- product.module.ts

Make sure to include DTOs and proper validation.

Generate `product.entity.ts` for NestJS using TypeORM. It should match the fields I listed, including timestamps and enum for status.

Generate the following DTOs:

- CreateProductDto

- UpdateProductDto

Include validation decorators.

Generate the product service interface `product.service.interface.ts`. It should have methods for:

- createProduct()

- getAllProducts()

- getProductById()

- updateProduct()

- changeProductStatus()

Using TypeORM and dependency injection, generate `product.service.ts` that implements the interface and contains the logic for the 5 operations.

Generate `product.controller.ts` for NestJS with the following endpoints:

- POST /products → Add product

- GET /products → Get all products

- GET /products/:id → Get product by ID

- POST /products/:id → Edit product details

- PATCH /products/:id/status → Change status (active/inactive)

Use proper routing, decorators, and call the service methods.

Generate `product.module.ts` and register the entity, service, and controller.


### Enable PostgreSQL Connection

Give me a sample configuration to connect PostgreSQL to my NestJS project using TypeORM. Use `.env` variables for host, port, username, password, and database.


### Seed Data Generation

Generate a seed script to add a few sample products to the database for testing. Make sure the script uses the Product entity.


### Unit Test Generation Prompts

#### Unit Tests for ProductService:

Generate unit tests for `ProductService` in NestJS using Jest. It should include:

- createProduct()

- getAllProducts()

- getProductById()

- updateProduct()

- changeProductStatus()

Mock the repository and dependencies using `@nestjs/testing`.

#### Edge Case Unit Tests

Add test cases for edge scenarios like:

- Getting a non-existent product

- Updating a product with invalid data

- Changing status of a product that doesn't exist

Use NestJS Jest practices and mock repository behavior.


### Integration Test Generation Prompts

#### Integration Tests for ProductController:

Generate integration tests for `ProductController` using NestJS and Supertest. The tests should:

- Start the app with `TestingModule`

- Test POST /products to create a product

- Test GET /products to return list

- Test GET /products/:id to return specific product

- Test POST /products/:id to update product

- Test PATCH /products/:id/status to toggle active/inactive

Use `Supertest` and in-memory DB or test container if needed.

#### Integration Test Setup Prompt:

Generate the test setup code for running integration tests with NestJS and PostgreSQL. Use `.env.test` and configure the app module to run in test mode.


### Comment in Code for Review:

- Review this function for improvements or edge cases.

- Based on this `ProductService`, suggest any missing test cases or edge conditions I should add in my unit or integration tests.