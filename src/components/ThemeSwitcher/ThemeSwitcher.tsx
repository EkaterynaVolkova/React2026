'use client';

import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/Button';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <Button className="button" onClick={toggleTheme}>
        <span aria-hidden="true" suppressHydrationWarning>
          {theme == 'light' ? '🌙 dark mode' : '☀️ light mode'}
        </span>
      </Button>
    </div>
  );
};
