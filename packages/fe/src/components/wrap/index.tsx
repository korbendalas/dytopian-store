import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { Button } from '@/components/ui';
import { AuthProvider } from '@/context/auth/authContextProvider';
import { queryClient } from '@/lib/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// import { Notifications } from "@/components/Notifications/Notifications";

const ErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

type WrapProps = {
  children: React.ReactNode;
};

export const Wrap = ({ children }: WrapProps) => {
  const GOOGLE_OAUTH_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string;

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          SPINNER
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <GoogleOAuthProvider clientId={GOOGLE_OAUTH_ID}>
            <QueryClientProvider client={queryClient}>
              {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
              {/*<Notifications />*/}
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
