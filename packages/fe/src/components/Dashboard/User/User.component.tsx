import { ProfileCard } from '@/components/Dashboard/User/ProfileCard/ProfileCard.component';
import { Outlet } from 'react-router-dom';

export const User = () => {
  return (
    <div className="hidden md:block">
      {/*<Menu />*/}
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <ProfileCard />
            {/*<Sidebar sidebarItems={sidebarItems} className="hidden lg:block" />*/}
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                hello
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
