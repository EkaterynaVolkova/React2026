import React, { Component } from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  className?: string;
  children?: React.ReactNode;
}

export class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    const { className, children } = this.props;
    return <div className={`${className}`}>{children}</div>;
  }
}
