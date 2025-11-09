import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-2xl w-full">
            <div className="text-center space-y-6">
              <div className="text-6xl">😕</div>
              <h1 className="text-3xl font-bold text-error">Oops! Something went wrong</h1>
              <p className="text-xl text-text-secondary">
                Don't worry, your progress is saved! Let's try to fix this.
              </p>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={this.handleReset}
                >
                  Try Again
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>

              {/* Show error details in development */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="cursor-pointer text-sm text-text-secondary">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
