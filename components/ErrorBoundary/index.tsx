import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

type State = {
  hasError: false;
} |
{
    hasError: true;
    errorMessage: string;
    errorName: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.

    return { 
        hasError: true, 
        errorMessage: _.message,
        errorName: _.name
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
        return (
            <>
                <h3>{this.state.errorName}</h3>
                <p>{this.state.errorMessage}</p>
            </>
        );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;