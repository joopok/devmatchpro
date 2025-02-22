import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const StyledErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
`;

const ErrorMessage = styled.p`
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <StyledErrorContainer>
          <ErrorMessage>
            죄송합니다. 오류가 발생했습니다.
            <br />
            {this.state.error?.message}
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            다시 시도
          </RetryButton>
        </StyledErrorContainer>
      );
    }

    return this.props.children;
  }
} 