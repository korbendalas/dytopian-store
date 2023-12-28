import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
  async createProduct() {
    return 'This action adds a new product';
  }
  async updateProduct() {
    return 'This action updates a product';
  }

  async deleteProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
