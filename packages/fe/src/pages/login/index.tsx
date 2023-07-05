import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/loginForm';
import { cn } from '@/lib/cn';

function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mx-auto flex w-3/12 items-center justify-center py-4',
        className
      )}
      {...props}
    />
  );
}
export function LoginPage() {
  return (
    <Container>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="mx-auto text-2xl">
            Sign in to your account
          </CardTitle>
          {/*<CardDescription></CardDescription>*/}
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </Container>
  );
}
