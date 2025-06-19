import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env config available everywhere
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
         type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT ?? '5432', 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // set to false in production
      }),
      inject: [ConfigService],
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
