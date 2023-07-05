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
        user_id: user.id,
      },
      include: {
        Product: {
          include: {
            ProductImages: true,
          },
        },
      },
    });

    return cart.map((item) => ({
      ...item.Product,
      images: item.Product.ProductImages,
      brandId: item.Product.brand_id,
      productId: item.product_id,
      quantity: item.quantity,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      userId: item.user_id,
    }));
  }

  async addToCart({ user, productId, quantity }) {
    const product = await this.getProductById(productId);
    const cartItems = await this.prismaService.cartItem.findMany({
      where: {
        user_id: user.id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // check if array of cart items includes the product id
    const cartItem = cartItems.find((item) => item.product_id === productId);
    if (cartItem) {
      throw new BadRequestException('You cannot add the same product twice');
    }

    const cart = await this.prismaService.cartItem.create({
      data: {
        user_id: user.id,
        product_id: productId,
        quantity,
      },
    });
    console.log('add to cart', cart);
    return cart;
  }

  async removeFromCart(user, product_id) {
    const cart = await this.prismaService.cartItem.delete({
      where: {
        user_id_product_id: {
          user_id: user.id,
          product_id,
        },
      },
    });
    console.log(' remove from cart', cart);
    return cart;
  }

  async updateCart(user, product_id, quantity) {
    const cart = await this.prismaService.cartItem.update({
      where: {
        user_id_product_id: {
          user_id: user.id,
          product_id,
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
