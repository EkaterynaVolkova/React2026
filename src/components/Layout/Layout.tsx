import { AppNav } from '@components/AppNav';
import { Outlet } from 'react-router';
import './Layout.css';

export const Layout = () => {
  return (
    <>
      <header>
        <div className="container">
          <AppNav />
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
