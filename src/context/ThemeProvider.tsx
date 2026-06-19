'use client';

import { useCallback, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DARK_THEME, LITE_THEME } from '../constants/global';
import { THEME_KEY } from '../constants/storage';
import { ThemeContext } from './ThemeContext';
import { Theme } from '@/types/shared/types';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, LITE_THEME);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === LITE_THEME ? DARK_THEME : LITE_THEME
    );
  }, [setTheme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
};
