import { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DARK_THEME, LITE_THEME } from '../constants/global';
import { THEME_KEY } from '../constants/storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LITE_THEME,
  toggleTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, LITE_THEME);

  const toggleTheme = () =>
    setTheme(theme === LITE_THEME ? DARK_THEME : LITE_THEME);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export { ThemeContext };
