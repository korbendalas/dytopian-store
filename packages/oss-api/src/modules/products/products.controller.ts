import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Brand, Category, Product } from '@prisma/client';
import { Public } from '../../common/decorators/public.decorator';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { RbacPolicy } from '../auth/rbac-policy';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CreateProductDTO } from './dtos/create-product.dto';

export type ProductsPaginated = {
  productsList: Product[];
  totalCount: number;
};
@ApiTags('Products')
// @UseInterceptors(CacheInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiQuery({ name: 'limit', required: true, type: Number, example: 20 })
  @ApiQuery({ name: 'offset', required: true, type: Number, example: 1 })
  // @ApiCreatedResponse({ type: ProductsPaginated })
  @CacheTTL(10)
  @CacheKey('all-products')
  @Get()
  async getProducts(
    @Query('limit', new ParseIntPipe()) limit = 20,
    @Query('offset', new ParseIntPipe()) offset = 1,
  ): Promise<ProductsPaginated> {
    return this.productService.getProducts(limit, offset);
  }

  @ApiQuery({ name: 'limit', required: true, type: Number, example: 20 })
  @ApiQuery({ name: 'offset', required: true, type: Number, example: 1 })
  @Get('featured')
  async getFeaturedProducts(
    @Query('limit', new ParseIntPipe()) limit = 20,
    @Query('offset', new ParseIntPipe()) offset = 1,
  ) {
    return this.productService.getFeaturedProducts(limit, offset);
  }

  // @Public()
  // @Get(':id')
  // async getProductById(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.productService.getProductById(id);
  // }

  @Get('/:uuid')
  async getProductByUUID(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.productService.getProductByUuid(uuid);
  }

  @Public()
  @Post()
  createProduct(@Body() product: CreateProductDTO) {
    return this.productService.createProduct(product);
  }

  @Put('/:uuid')
  updateProduct(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() product: CreateProductDTO,
  ) {
    return this.productService.updateProduct(uuid, product);
  }

  // @UseRoles({
  //   resource: RbacPolicy.PRODUCTS,
  //   action: 'delete',
  //   possession: 'any',
  // })
  @Delete(':uuid')
  deleteProduct(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.productService.deleteProduct(uuid);
  }

  @Get('brands')
  async getBrands(): Promise<Brand[]> {
    return this.productService.getBrands();
  }

  @Get('categories')
  async getCategories(): Promise<Category[]> {
    return this.productService.getCategories();
  }
}
