import { lazy } from 'react';

const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const Home = lazy(() => import('../components/home'));

const coreRoutes = [
    {
        path: '/',
        title: 'Home',
        component: Home,
    },
    {
        path: '/dashboard',
        title: 'Dashboard',
        component: Dashboard,
    },
];

const routes = [...coreRoutes];
export default routes;