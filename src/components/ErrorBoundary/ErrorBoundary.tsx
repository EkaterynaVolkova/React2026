import { Button } from '@components/Button';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  onReload = () => window.location.reload();

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="boundary-error-wrap">
            <h1>Something went wrong. Try refreshing the page.</h1>
            <Button className="primary-button" onClick={this.onReload}>
              Reload
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
