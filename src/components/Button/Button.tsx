import type { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
  const { className, children, onClick } = props;
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
