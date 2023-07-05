import { useEffect, useState } from 'react';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

/**
 * @description Hook to manage the theme of the application
 * @returns {object} theme - The current theme
 * @returns {function} toggleTheme - Function to toggle the theme
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null | undefined>(localStorage.theme || Theme.Light);
  const colorTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme as string);
    root.classList.add(theme as string);
    localStorage.setItem('theme', theme as string);
  }, [theme, colorTheme]);

  function toggleTheme() {
    setTheme((prevState) => (prevState === Theme.Dark ? Theme.Light : Theme.Dark));
  }

  return { theme, toggleTheme };
}
