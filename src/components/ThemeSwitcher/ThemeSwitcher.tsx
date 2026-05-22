import { Button } from '@components/Button';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <Button className="button" onClick={toggleTheme}>
        <span aria-hidden="true">
          {theme == 'light' ? '🌙 dark mode' : '☀️ light mode'}
        </span>
      </Button>
    </div>
  );
};
