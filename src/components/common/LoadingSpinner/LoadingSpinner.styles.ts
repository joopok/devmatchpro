import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface SpinnerContainerProps {
  fullScreen: boolean;
}

interface SpinnerProps {
  size: 'small' | 'medium' | 'large';
}

export const SpinnerContainer = styled.div<SpinnerContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ fullScreen }) =>
    fullScreen &&
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

export const Spinner = styled.div<SpinnerProps>`
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'width: 20px; height: 20px;';
      case 'medium':
        return 'width: 32px; height: 32px;';
      case 'large':
        return 'width: 48px; height: 48px;';
    }
  }}
`; 