import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerElement = styled.div`
  width: 1.2em;
  height: 1.2em;
  border: 0.2em solid rgba(255, 255, 255, 0.3);
  border-top: 0.2em solid #fff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color
}) => {
  return (
    <SpinnerContainer>
      <SpinnerElement />
    </SpinnerContainer>
  );
};

export default LoadingSpinner; 