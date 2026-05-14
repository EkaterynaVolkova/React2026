import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  className?: string;
  children?: React.ReactNode;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { className, children } = props;
  return <div className={`${className}`}>{children}</div>;
};
