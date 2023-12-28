import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../../common/decorators/public.decorator';

@Injectable()
@Public()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCart(user) {
    const cart = await this.prismaService.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: {
          include: {
            productImages: true,
          },
        },
      },
    });

    return cart.map((item) => ({
      ...item.product,
      images: item.product.productImages,
      brandId: item.product.brandId,
      productId: item.productId,
      quantity: item.quantity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      userId: item.userId,
    }));
  }

  async addToCart({ user, productId, quantity }) {
    const product = await this.getProductById(productId);
    const cartItems = await this.prismaService.cartItem.findMany({
      where: {
        userId: user.id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // check if array of cart items includes the product id
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (cartItem) {
      throw new BadRequestException('You cannot add the same product twice');
    }

    const cart = await this.prismaService.cartItem.create({
      data: {
        userId: user.id,
        productId: productId,
        quantity,
      },
    });
    console.log('add to cart', cart);
    return cart;
  }

  async removeFromCart(user, productId) {
    const cart = await this.prismaService.cartItem.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });
    console.log(' remove from cart', cart);
    return cart;
  }

  async updateCart(user, productId, quantity) {
    const cart = await this.prismaService.cartItem.update({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
      data: {
        quantity,
      },
    });
    console.log('update cart', cart);
    return cart;
  }

  async getProductById(productId) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  }
}
