import { Injectable, NotFoundException } from '@nestjs/common';
import { Flower } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';
import { CreateFlowerDto, UpdateFlowerDto } from './dto/flowers.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FlowersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  findAll(): Promise<Flower[]> {
    return this.prismaService.flower.findMany();
  }
  async findOne(id: number): Promise<Flower> {
    const flower = await this.prismaService.flower.findUnique({
      where: { id },
    });
    if (!flower) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }
    return flower;
  }

  async create(dto: CreateFlowerDto): Promise<Flower> {
    const flower = await this.prismaService.flower.create({ data: dto });
    return flower;
  }

  async update(id: number, dto: UpdateFlowerDto): Promise<Flower> {
    try {
      return await this.prismaService.flower.update({
        where: { id },
        data: { ...dto, updated_at: new Date() },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Flower with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Flower> {
    try {
      return await this.prismaService.flower.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Flower with ID ${id} not found`);
      }
      throw error;
    }
  }
}
