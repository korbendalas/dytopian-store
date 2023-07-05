import { LoginCredentialsDTO, RegisterCredentialsDTO } from '@/api/auth';
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateAsyncFunction,
} from 'react-query';
export type AuthUser = {
  address: null | string;
  city: null | string;
  country: null | string;
  created_at: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  telephone: null | string;
  updated_at: string;
  user_type: 'REGULAR';
  username: string;
  zipCode: null | string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};

export interface AuthContextValue {
  user: AuthUser | undefined;
  login: UseMutateAsyncFunction<AuthUser, any, LoginCredentialsDTO>;
  loginError: UseMutateAsyncFunction<AuthUser, any, LoginCredentialsDTO>;
  logout: UseMutateAsyncFunction<any, any, void, any>;
  register: UseMutateAsyncFunction<AuthUser, any, RegisterCredentialsDTO>;
  registerError: UseMutateAsyncFunction<AuthUser, any, RegisterCredentialsDTO>;
  registerGoogle: UseMutateAsyncFunction<AuthUser, any, any>;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isRegistering: boolean;
  refetchUser: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AuthUser, Error>>;
  error: Error | null;
}
