import { Sidebar } from '@/components';
import { BrowserRouter as Router } from 'react-router-dom';

export const GlobalComponents = () => {
  return (
    <>
      <Router>
        <Sidebar />
      </Router>
    </>
  );
};
