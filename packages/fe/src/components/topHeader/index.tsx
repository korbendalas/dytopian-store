import { ModeToggle } from '@/components';
import { useGetCart } from '@/components/home/shoppingCart/api/getCart';
import { ShoppingCartDropdownNav } from '@/components/home/shoppingCart/shoppingCartDropdownNav';
import { Icons } from '@/components/icons';
import { NotificationBadge } from '@/components/notificationBadge';
import { Button } from '@/components/ui';
import { Search } from '@/components/ui/search';
import { PageWrap } from '@/components/wrap/pageWrap';
import { useAuth } from '@/context/auth/authContextProvider';
import { Link } from 'react-router-dom';
import { UserDropdownNav } from '../userDropdownNav';

export const TopHeader = () => {
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();
  const { data, isLoading } = useGetCart();
  console.log('CART', data);
  const numberOfItems = data?.length ?? 0;
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <PageWrap>
          <div className="flex h-16 items-center px-4">
            {/*<MainNav className="mx-6" />*/}
            <Link to={'/'}>Home</Link>
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ModeToggle />
              <ShoppingCartDropdownNav
                cart={data ?? []}
                isLoading={isLoading}
                numberOfItems={numberOfItems}
              >
                <Button variant="ghost" size="sm" className="w-9 px-0">
                  <NotificationBadge
                    element={
                      <Icons.cart className="scale-100 transition-all hover:text-indigo-500" />
                    }
                    numberOfNotifications={numberOfItems}
                  />
                </Button>
              </ShoppingCartDropdownNav>
              {isLoggedIn && <UserDropdownNav />}
            </div>
          </div>
        </PageWrap>
      </div>
    </div>
  );
};
