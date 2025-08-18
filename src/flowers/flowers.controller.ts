import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';

type CreateFlowerDto = {
  name: string;
  color: string;
  price: number;
};

type UpdateFlowerDto = Partial<CreateFlowerDto>;

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get()
  findAll() {
    return this.flowersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowersService.findOne(Number(id));
  }

  @Post()
  create(@Body() createFlowerDto: CreateFlowerDto) {
    return this.flowersService.create(createFlowerDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update(Number(id), updateFlowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowersService.remove(Number(id));
  }
}
