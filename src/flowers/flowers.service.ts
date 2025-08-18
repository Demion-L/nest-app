import { Injectable, NotFoundException } from '@nestjs/common';

type Flower = {
  id: number;
  name: string;
  color: string;
  price: number;
};

@Injectable()
export class FlowersService {
  private flowers: Flower[] = [
    {
      id: 1,
      name: 'Rose',
      color: 'Red',
      price: 100,
    },
    {
      id: 2,
      name: 'Tulip',
      color: 'Yellow',
      price: 200,
    },
    {
      id: 3,
      name: 'Chrysanthemum',
      color: 'White',
      price: 300,
    },
  ];

  private lastId = 3;

  findAll() {
    return [...this.flowers];
  }

  findOne(id: number) {
    const flower = this.flowers.find((f) => f.id === id);
    if (!flower) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }
    return { ...flower };
  }

  create(createFlowerDto: Omit<Flower, 'id'>) {
    const newFlower = {
      id: ++this.lastId,
      ...createFlowerDto,
    };
    this.flowers.push(newFlower);
    return newFlower;
  }

  update(id: number, updateFlowerDto: Partial<Omit<Flower, 'id'>>) {
    const flowerIndex = this.flowers.findIndex((f) => f.id === id);
    if (flowerIndex === -1) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }

    this.flowers[flowerIndex] = {
      ...this.flowers[flowerIndex],
      ...updateFlowerDto,
    };

    return { ...this.flowers[flowerIndex] };
  }

  remove(id: number) {
    const flowerIndex = this.flowers.findIndex((f) => f.id === id);
    if (flowerIndex === -1) {
      throw new NotFoundException(`Flower with ID ${id} not found`);
    }

    const [deletedFlower] = this.flowers.splice(flowerIndex, 1);
    return { ...deletedFlower };
  }
}
