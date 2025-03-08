import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  color?: 'primary' | 'secondary';
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  fullScreen = false,
  color = 'primary'
}) => {
  return (
    <SpinnerContainer $fullScreen={fullScreen}>
      <Spinner $size={size} $color={color} />
    </SpinnerContainer>
  );
};

interface SpinnerContainerProps {
  $fullScreen: boolean;
}

const SpinnerContainer = styled.div<SpinnerContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $fullScreen }) =>
    $fullScreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1000;
  `}
`;

interface SpinnerProps {
  $size: 'small' | 'medium' | 'large';
  $color: 'primary' | 'secondary';
}

const Spinner = styled.div<SpinnerProps>`
  border: 3px solid ${({ theme }) => theme.colors.backgroundAlt};
  border-top: 3px solid ${({ theme, $color }) => theme.colors[$color]};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 'width: 20px; height: 20px;';
      case 'medium':
        return 'width: 32px; height: 32px;';
      case 'large':
        return 'width: 48px; height: 48px;';
      default:
        return 'width: 32px; height: 32px;';
    }
  }}
`; 