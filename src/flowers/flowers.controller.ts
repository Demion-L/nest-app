import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { AuthGuard } from 'src/conception/guard';
import { LoggingInterceptor } from 'src/conception/interceptor';
import { GetFlowersDto } from './dto/flowers.dto';

type CreateFlowerDto = {
  name: string;
  color: string;
  price: number;
};

type UpdateFlowerDto = Partial<CreateFlowerDto>;

@Controller('flowers')
// Interceptors
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get()
  // Guards
  @UseGuards(AuthGuard)
  findAll(@Query() query: GetFlowersDto) {
    const page = query.pageNumber ? parseInt(query.pageNumber, 10) : 1;
    console.log(page);
    return this.flowersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowersService.findOne(Number(id));
  }

  @Post()
  @UsePipes(new ValidationPipe())
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
