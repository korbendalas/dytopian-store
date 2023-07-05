// import { lazyImport } from '@/utils/lazyImport';
// const { LoginRegisterPage } = lazyImport(
//   () => import('@/features/auth/components/loginRegisterPage'),
//   'LoginRegisterPage'
// );

import { LoginPage, OAuthRedirect, RegisterPage } from '@/pages';

export const publicRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/oauth-redirect', element: <OAuthRedirect /> },
];
