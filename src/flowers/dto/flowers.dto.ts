import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFlowerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @Type(() => Number)
  price: number;
}

// PartialType allows to make all properties optional
export class UpdateFlowerDto extends PartialType(CreateFlowerDto) {}
