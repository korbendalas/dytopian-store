import {
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  getUser,
  loginWithEmailAndPassword,
  logoutUser,
  registerWithEmailAndPassword,
} from '@/api/auth';
import { storage } from '@/utils/storage';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// import { AuthContext } from './authContext';
import { AuthContextValue } from '@/api/auth/types';
import { AuthContext } from '@/context/auth/authContext';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  key?: string;
}
export function AuthProvider({
  children,
  key = 'auth-user',
}: AuthProviderProps): JSX.Element {
  const queryClient = useQueryClient();

  async function handleUserResponse(data: any) {
    const { token, refreshToken, user } = data;
    storage.setToken(token);
    console.log('REFRESH TOKEN', refreshToken);
    storage.setRefreshToken(refreshToken);
    return user;
  }

  // load user from LS - then fetch data if token is present
  async function loadUser() {
    if (storage?.getToken()) {
      const data = await getUser();
      console.log('load user data', data);
      if (data) {
        return data;
      } else return null;
    }
    return null;
  }
  //
  async function loginFn(data: LoginCredentialsDTO) {
    const response = await loginWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    return user;
  }

  async function registerFn(data: RegisterCredentialsDTO) {
    const response = await registerWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    return user;
  }

  const {
    data: user,
    error,
    status,
    isLoading,
    isIdle,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: key,
    queryFn: loadUser,
  });

  const setUser = React.useCallback(
    (data: any) => queryClient.setQueryData(key, data),
    [queryClient]
  );

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (user) => {
      setUser(user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerFn,
    onSuccess: (user) => {
      setUser(user);
    },
  });

  async function logoutFn() {
    await logoutUser();
    storage.clearTokens();
    // This reloads whole app and resets it to beginner state
    window.location.assign(window.location.origin as unknown as string);
  }

  const logoutMutation = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const value = React.useMemo(
    () => ({
      user,
      error,
      refetchUser: refetch,
      login: loginMutation.mutateAsync,
      loginError: loginMutation.error,
      isLoggingIn: loginMutation.isLoading,
      logout: logoutMutation.mutateAsync,
      isLoggingOut: logoutMutation.isLoading,
      register: registerMutation.mutateAsync,
      registerError: registerMutation.error,
      isRegistering: registerMutation.isLoading,
      isLoggedIn: Boolean(user),
    }),
    [
      user,
      error,
      refetch,
      loginMutation.mutateAsync,
      loginMutation.isLoading,
      logoutMutation.mutateAsync,
      logoutMutation.isLoading,
      registerMutation.mutateAsync,
      registerMutation.isLoading,
      loginMutation.error,
      loginMutation.error,
    ]
  );

  if (isLoading || isIdle) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div>
          <svg className="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'tomato' }}>{JSON.stringify(error, null, 2)}</div>
    );
  }

  if (isSuccess) {
    return (
      // @ts-ignore // TODO UPDATE THIS TYPE
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }

  return <div>Unhandled status: {status}</div>;
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
}
