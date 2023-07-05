import { Icons } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { Label } from '@/components/ui/label';
import { REDIRECT_URL } from '@/config';
import { useAuth } from '@/context/auth/authContextProvider';
import { cn } from '@/lib/cn';
import { useGoogleLogin } from '@react-oauth/google';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export interface LoginFormProps {
  className?: string;
}

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};
export const LoginForm = ({ className }: LoginFormProps) => {
  const { login, isLoggingIn, loginError } = useAuth();
  const navigate = useNavigate();
  async function onSubmit(data: LoginCredentialsDTO): Promise<any> {
    try {
      await login(data);
      await navigate('/');
    } catch (error: any) {
      if (error?.response?.status === 400) {
        console.log('ERROR LOGIN', error?.response?.data?.message);
        setError('root.serverError', {
          type: error?.response?.data?.message,
        });
      }
    }
  }

  const googleLogin = useGoogleLogin({
    redirect_uri: REDIRECT_URL,
    ux_mode: 'redirect',
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginCredentialsDTO>({});

  return (
    <div className={cn('grid gap-6', className)}>
      <form
        className={clsx('space-y-6', className)}
        onSubmit={handleSubmit(onSubmit)}
        id="login"
      >
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-6">
            <Button type="button" variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                await googleLogin();
              }}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-1">
            {errors?.root?.serverError && (
              <div className="py-1 text-center text-xs text-red-400">
                {errors?.root?.serverError?.type}
              </div>
            )}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              registration={register('email')}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              registration={register('password')}
            />
          </div>
          {/*<div className="grid gap-1">*/}
          {/*  <Button*/}
          {/*    type="submit"*/}
          {/*    className="w-full"*/}
          {/*    disabled={isLoading}*/}
          {/*    isLoading={isLoading}*/}
          {/*  >*/}
          {/*    Login*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
        <Button type="submit" className="w-full ">
          Login
        </Button>
      </form>
    </div>
  );
};
