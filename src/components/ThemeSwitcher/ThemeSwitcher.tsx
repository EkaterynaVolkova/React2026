import { Button } from '@components/Button';
import { useTheme } from '../../hooks/useTheme';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
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
