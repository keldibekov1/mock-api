import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';



@Module({
  imports: [PrismaModule, UploadModule,UploadModule,
    ServeStaticModule.forRoot({
     rootPath: join(__dirname, '..', 'uploads'),
     serveRoot: '/file'
   }),
    CategoryModule,
    ProductModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
