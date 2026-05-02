import { Component } from 'react';
import type { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
}

export class Button extends Component<ButtonProps> {
  render() {
    const { className, children } = this.props;
    return <button className={`button ${className}`}>{children}</button>;
  }
}
