import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div>
      This page doesn&apos;t exist. Go <Link to="/">Home</Link>
    </div>
  );
};
