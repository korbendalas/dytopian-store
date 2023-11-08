import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/pages/product/types';

export function ShoppingCartDropdownNav({
  children,
  cart,
  numberOfItems,
  isLoading,
}: {
  children: React.ReactNode;
  cart: Product[];
  numberOfItems: number;
  isLoading: boolean;
}) {
  console.log('CART in dropdown', cart);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="center" forceMount>
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            {' '}
            <p>Shopping Cart</p>
            <span>
              Total: $
              {cart.reduce(
                (acc, obj) =>
                  acc +
                  obj.quantity *
                    (obj.discountPrice ? obj.discountPrice : obj.price),
                0
              )}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <DropdownMenuGroup>
            {numberOfItems > 0 ? (
              cart?.map((item) => {
                // find cover image from images array and use that
                return (
                  <DropdownMenuItem
                    key={item.id}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={item?.images?.find((image) => image.cover)?.imgUrl}
                      alt={item.title}
                      className="h-8 w-8 rounded object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {item.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.quantity} x ${item.price}
                      </span>
                    </div>
                  </DropdownMenuItem>
                );
              })
            ) : (
              <DropdownMenuItem>No items in cart</DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
