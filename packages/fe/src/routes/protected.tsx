import {
  AccountPage,
  BillingPage,
  ConnectionsPage,
  DashboardPage,
  NotificationsPage,
  OrdersPage,
  SecurityPage,
  StorePage,
  UserOverviewPage,
} from '@/pages';
import { Navigate } from 'react-router-dom';

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        path: '/dashboard/user',
        element: <UserOverviewPage />,
        children: [
          { path: '/dashboard/user/account', element: <AccountPage /> },
          { path: '/dashboard/user/billing', element: <BillingPage /> },
          { path: '/dashboard/user/connections', element: <ConnectionsPage /> },
          {
            path: '/dashboard/user/notifications',
            element: <NotificationsPage />,
          },
          { path: '/dashboard/user/security', element: <SecurityPage /> },
        ],
      },

      { path: '/dashboard/orders', element: <OrdersPage /> },
      { path: '/dashboard/store', element: <StorePage /> },

      // { path: '/', element: <DashboardPage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
