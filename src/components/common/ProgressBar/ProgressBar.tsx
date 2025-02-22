import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'medium',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <Container $size={size}>
      <Progress $percentage={percentage} />
    </Container>
  );
};

const Container = styled.div<{ $size: string }>`
  width: 100%;
  height: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '4px';
      case 'large':
        return '12px';
      default:
        return '8px';
    }
  }};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  overflow: hidden;
`;

const Progress = styled.div<{ $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`; 