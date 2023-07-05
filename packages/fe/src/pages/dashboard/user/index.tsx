import { ProfileCard } from '@/pages/dashboard/user/components/profileCard';
import { Outlet } from 'react-router-dom';

export const UserOverviewPage = () => {
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
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
