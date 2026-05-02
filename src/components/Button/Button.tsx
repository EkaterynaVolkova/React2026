import { Component } from 'react';
import type { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export class Button extends Component<ButtonProps> {
  render() {
    const { className, children, onClick } = this.props;
    return (
      <button className={`button ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }
}
