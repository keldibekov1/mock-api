import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findAll(query: any) {
    const {
      search,
      categoryId,
      sortBy = 'id',
      sortOrder = 'asc',
      page = 1,
      limit = 10,
    } = query;
  
    const where = {
      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }),
      ...(categoryId && { categoryId: Number(categoryId) }),
    };
  
    const orderBy = {
      [sortBy]: sortOrder,
    };
  
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
  
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: { category: true },
      }),
      this.prisma.product.count({ where }),
    ]);
  
    return {
      total,
      skip,
      limit: take,
      data: items,
    };
  }
  
  

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id }, include: { category: true } });
  }

  async update(id: number, data: UpdateProductDto) {
    await this.ensureExists(id);
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.product.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
  }
}
