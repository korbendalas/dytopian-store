import { HomePage, ProductPage } from '@/pages';

export const commonRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <HomePage />,
  },
  {
    path: 'product/:uuid',
    element: <ProductPage />,
  },
];
