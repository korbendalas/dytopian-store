import { Sidebar } from '@/components/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import { sidebarItems } from './Dashboard.utils';

export const Dashboard = () => {
  return (
    <div className="hidden md:block">
      {/*<Menu />*/}
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar sidebarItems={sidebarItems} className="hidden lg:block" />
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
