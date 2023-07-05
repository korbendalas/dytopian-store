import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Theme, useTheme } from '@/hooks';
export function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" size="sm" className="w-9 px-0" onClick={toggleTheme}>
      {theme === Theme.Light ? (
        <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
