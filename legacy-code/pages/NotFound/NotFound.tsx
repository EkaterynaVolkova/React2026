import { Link } from 'react-router';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="error-page__container">
      <h1 className="code">404</h1>
      <h2 className="title">OOPS! This page doesn&apos;t exist</h2>
      <Link className="button home-link" to="/">
        Go Home
      </Link>
    </div>
  );
};
