import { SidebarItem } from '@/components/Dashboard/Dashboard.types';
import {
  BellRing,
  Lock,
  Receipt,
  Settings,
  ShoppingCart,
  Store,
  User2,
  Users,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const sidebarItems: SidebarItem[] = [
  {
    id: uuidv4(),
    sectionTitle: 'User Profile',
    name: 'User',
    icon: <User2 />,
    href: '/dashboard/user',
    children: [
      {
        id: uuidv4(),
        name: 'Profile',
        icon: <User2 />,
        href: '/dashboard/user',
      },
      {
        id: uuidv4(),
        name: 'Account',
        icon: <Settings />,
        href: '/dashboard/user/account',
      },
      {
        id: uuidv4(),
        name: 'Security',
        icon: <Lock />,
        href: '/dashboard/user/security',
      },
      {
        id: uuidv4(),
        name: 'Billing',
        icon: <Receipt />,
        href: '/dashboard/user/billing',
      },
      {
        id: uuidv4(),
        name: 'Notifications',
        icon: <BellRing />,
        href: '/dashboard/user/notifications',
      },
      {
        id: uuidv4(),
        name: 'Connections',
        icon: <Users />,
        href: '/dashboard/user/connections',
      },
    ],
  },
  {
    id: uuidv4(),
    sectionTitle: 'Orders',
    name: 'Orders',
    icon: <ShoppingCart />,
    href: '/dashboard/orders',
  },
  {
    id: uuidv4(),
    sectionTitle: 'Store',
    name: 'Store',
    icon: <Store />,
    href: '/dashboard/store',
  },
];
