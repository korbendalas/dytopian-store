import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Brand, Category, Product } from '@prisma/client';
import { CreateProductDTO } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async getProducts(limit: number, offset: number) {
    return this.prismaService.$transaction(async (prisma) => {
      const productsList = await prisma.product.findMany({
        skip: (offset - 1) * limit, // Calculate the number of items to skip based on the page and page size
        take: limit, // Define the maximum number of items to fetch per page
      });

      const totalCount = await prisma.product.count();

      return { productsList, totalCount };
    });
  }

  async getFeaturedProducts(limit: number, offset: number) {
    return this.prismaService.$transaction(async (prisma) => {
      const products = await prisma.featuredProduct.findMany({
        skip: (offset - 1) * limit, // Calculate the number of items to skip based on the page and page size
        take: limit, //
        select: {
          product: {
            include: {
              brand: true,
              category: true,
              productImages: true,
            },
          },
        },
      });

      // // Modify the result to use lowercase property names
      const productsList = products.map((featuredProduct) => ({
        id: featuredProduct.product.id,
        uuid: featuredProduct.product.uuid,
        title: featuredProduct.product.title,
        price: featuredProduct.product.price,
        discountPrice: featuredProduct.product.discountPrice,
        quantity: featuredProduct.product.quantity,
        sold: featuredProduct.product.sold,
        smallDescription: featuredProduct.product.smallDescription,
        largeDescription: featuredProduct.product.largeDescription,
        specification: featuredProduct.product.specification,
        categoryId: featuredProduct.product.categoryId,
        brand: featuredProduct.product.brand,
        category: featuredProduct.product.category,
        images: featuredProduct.product.productImages,
      }));

      const totalCount = await prisma.product.count();

      return { productsList, totalCount };
    });
  }

  async getProductByUuid(uuid: string) {
    await this.findUniqueProduct(uuid);

    const product = await this.prismaService.product.findUnique({
      where: { uuid },
      include: {
        brand: true,
        category: true,
        productImages: true,
      },
    });

    return {
      id: product.id,
      uuid: product.uuid,
      title: product.title,
      price: product.price,
      discountPrice: product.discountPrice,
      quantity: product.quantity,
      sold: product.sold,
      smallDescription: product.smallDescription,
      largeDescription: product.largeDescription,
      specification: product.specification,
      categoryId: product.categoryId,
      brand: product.brand,
      category: product.category,
      images: product.productImages,
    };
  }
  async getProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        productImages: true,
      },
    });

    return {
      id: product.id,
      uuid: product.uuid,
      title: product.title,
      price: product.price,
      discountPrice: product.discountPrice,
      quantity: product.quantity,
      sold: product.sold,
      smallDescription: product.smallDescription,
      largeDescription: product.largeDescription,
      specification: product.specification,
      categoryId: product.categoryId,
      brand: product.brand,
      category: product.category,
      images: product.productImages,
    };
  }
  async createProduct(product: CreateProductDTO) {
    const { categoryId, brandId, ...rest } = product;
    return this.prismaService.product.create({
      data: {
        ...rest,
        category: {
          connect: {
            id: categoryId,
          },
        },
        brand: {
          connect: {
            id: brandId,
          },
        },
      },
    });
  }
  async updateProduct(uuid: string, product: CreateProductDTO) {
    await this.findUniqueProduct(uuid);

    return this.prismaService.product.update({
      where: { uuid },
      data: product,
    });
  }

  async deleteProduct(uuid: string) {
    await this.findUniqueProduct(uuid);

    return this.prismaService.product.delete({
      where: { uuid },
    });
  }

  async getBrands(): Promise<Brand[]> {
    return this.prismaService.brand.findMany();
  }

  async getCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }

  async findUniqueProduct(uuid: string): Promise<Product> {
    const product = this.prismaService.product.findUnique({
      where: { uuid },
    });

    if (!product)
      throw new NotFoundException(`Product with id ${uuid} not found`);

    return product;
  }
}
