import { Header } from '@/components';
import { Sidebar } from '@/components/UI/organisms/Sidebar';
import { Outlet } from 'react-router-dom';

const sidebarItems = [
    {
        route: '/dashboard',
        label: 'Dashboard',
        icon: 'chart-line',
    },
    {
        route: '/profile',
        label: 'Profile',
        icon: 'user',
    },
];

const DefaultLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar title="Main Menu"  items={sidebarItems} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;