import {
  Dashboard,
  User,
  UserAccount,
  UserNotifications,
  UserOrders,
  UserSecurity,
} from '@/components';
import { StorePage } from '@/pages';
import { Navigate } from 'react-router-dom';

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard/user',
        element: <User />,
        children: [
          { path: '/dashboard/user/account', element: <UserAccount /> },
          { path: '/dashboard/user/orders', element: <UserOrders /> },

          {
            path: '/dashboard/user/notifications',
            element: <UserNotifications />,
          },
          { path: '/dashboard/user/security', element: <UserSecurity /> },
        ],
      },

      { path: '/dashboard/store', element: <StorePage /> },

      // { path: '/', element: <DashboardPage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
