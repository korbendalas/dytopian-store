import { PageWrap } from '@/components/wrap/pageWrap';
import { useAuth } from '@/context/auth/authContextProvider';
import { Link } from 'react-router-dom';

export const TopHeaderSmallNav = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="hidden flex-col md:flex ">
      <div className="border-b">
        <div className="flex h-8 items-center px-4">
          <PageWrap>
            <div className="ml-auto flex items-center justify-between space-x-4">
              <div>(+800) 123 456 7890</div>
              <div className="flex items-center">
                {!isLoggedIn ? (
                  <div>
                    {' '}
                    <Link to="login">Sign in </Link>
                    <span className="px-2"> or </span>{' '}
                    <Link to="/register">Register</Link>
                  </div>
                ) : (
                  <div className="cursor-pointer" onClick={() => logout()}>
                    Logout
                  </div>
                )}
              </div>
            </div>
          </PageWrap>
        </div>
      </div>
    </div>
  );
};
