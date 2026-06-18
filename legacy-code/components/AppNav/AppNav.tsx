import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { NavLink } from 'react-router';

export const AppNav = () => {
  return (
    <nav>
      <NavLink to="/" className="button" end>
        Home
      </NavLink>
      <NavLink to="/about" className="button">
        About
      </NavLink>
      <ThemeSwitcher />
    </nav>
  );
};
