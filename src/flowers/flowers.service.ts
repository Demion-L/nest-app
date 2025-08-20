import { Injectable } from '@nestjs/common';
import { flowers, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

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
      throw new Error(`Flower with ID ${id} not found`);
    }
    return flower;
  }

  async create(data: Prisma.flowersCreateInput): Promise<flowers> {
    return this.prismaService.flowers.create({ data });
  }

  async update(id: number, data: Prisma.flowersUpdateInput): Promise<flowers> {
    try {
      return await this.prismaService.flowers.update({
        where: { id },
        data: { ...data, updated_at: new Date() },
      });
    } catch (error) {
      const errorMessage = isErrorWithMessage(error)
        ? error.message
        : 'Unknown error occurred';
      throw new Error(`Failed to update flower with ID ${id}: ${errorMessage}`);
    }
  }

  async remove(id: number): Promise<flowers> {
    try {
      return await this.prismaService.flowers.delete({ where: { id } });
    } catch (error) {
      const errorMessage = isErrorWithMessage(error)
        ? error.message
        : 'Unknown error occurred';
      throw new Error(`Failed to delete flower with ID ${id}: ${errorMessage}`);
    }
  }
}
