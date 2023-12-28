import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  smallDescription: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  largeDescription: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  specification: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  discountPrice?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  brandId: number;
}
