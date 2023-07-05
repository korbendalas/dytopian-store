import { Footer, TopHeader, TopHeaderSmallNav } from '@/components';
import { AppRoutes } from '@/routes';
import { BrowserRouter as Router } from 'react-router-dom';

export const GlobalComponents = () => {
  return (
    <>
      <Router>
        <TopHeaderSmallNav />
        <TopHeader />
        <AppRoutes />
      </Router>
      <Footer />
    </>
  );
};
