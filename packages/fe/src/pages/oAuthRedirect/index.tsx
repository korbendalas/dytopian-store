import { useAuth } from '@/context/auth/authContextProvider';
import { storage } from '@/utils/storage';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function OAuthRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token) {
      // Store the token in your application's state or localStorage for authentication
      storage.setToken(token);
      if (refreshToken != null) {
        storage.setRefreshToken(refreshToken);
      }
      refetchUser();
      // window.location.assign(window.location.origin as unknown as string);
      // Redirect to the desired route in your application
      navigate('/');
    } else {
      // Handle case when token is not available or invalid
      navigate('/login');
    }
  }, [location.search]);

  return null; // or a loading indicator if needed
}
