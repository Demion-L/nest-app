import { Injectable, NotFoundException } from '@nestjs/common';
import { flowers, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { CreateFlowerDto, UpdateFlowerDto } from './dto/flowers.dto';

@Injectable()
export class FlowersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<flowers[]> {
    return this.prismaService.flowers.findMany();
  }
  async findOne(id: number): Promise<flowers> {
    const flower = await this.prismaService.flowers.findUnique({
      where: { id },
    });
    if (!flower) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }
    return flower;
  }

  async create(dto: CreateFlowerDto): Promise<flowers> {
    return this.prismaService.flowers.create({ data: dto });
  }

  async update(id: number, dto: UpdateFlowerDto): Promise<flowers> {
    try {
      return await this.prismaService.flowers.update({
        where: { id },
        data: { ...dto, updated_at: new Date() },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Flower with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<flowers> {
    try {
      return await this.prismaService.flowers.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Flower with ID ${id} not found`);
      }
      throw error;
    }
  }
}
