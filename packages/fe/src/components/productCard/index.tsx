import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAddToCart } from '@/features/shoppingCart/api/addToCart';
import { cn } from '@/lib/cn';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHoverDirty } from 'react-use';

type CardProps = React.ComponentProps<typeof Card>;

type ProductCard = {
  title: string;
  discountPrice: number;
  price: number | string;
  brand: { name: string };
  images: [{ imgUrl: string }];
  uuid: string;
  productId: number;
};

export function ProductCard({ ...props }: CardProps & ProductCard) {
  const {
    uuid,
    productId,
    title,
    discountPrice,
    price,
    brand,
    images,
    className,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHoverDirty(ref);

  const addToCartMutation = useAddToCart();
  const addToCart = () => {
    addToCartMutation.mutate({
      data: { productId: Number(productId), quantity: 1 },
    });
  };

  return (
    <Card
      ref={ref}
      className={cn('w-auto border-l-2 !border-none', className)}
      {...props}
    >
      <CardHeader>
        <CardDescription>{brand.name}</CardDescription>

        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <Link to={`product/${uuid}`}>
          <div className=" flex items-center justify-center space-x-4  p-4">
            <img className="h-auto w-full" src={images[0]?.imgUrl} />
          </div>
        </Link>
        <div className="mx-auto flex w-2/3 items-center justify-between space-x-4  p-4 pt-2">
          {discountPrice && (
            <div className={cn('text-gray-500', 'display:none')}>
              ${discountPrice}
            </div>
          )}
          <div className={cn('text-rose-500', discountPrice && 'line-through')}>
            ${price}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button onClick={addToCart} className="w-full">
          Add to cart{' '}
        </Button>

        {isHovering ? (
          <div className="flex items-center justify-center">
            <div>Preview</div> <div>Favorite</div>
          </div>
        ) : (
          <div className="p-3" />
        )}
      </CardFooter>
    </Card>
  );
}
