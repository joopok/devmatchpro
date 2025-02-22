import React from 'react';
import styled from 'styled-components';

interface LinearProgressProps {
  progress: number;
  height?: number;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  overflow: hidden;
`;

const Bar = styled.div<{ $value: number; $height: number; $color: string }>`
  height: ${({ $height }) => $height}px;
  width: ${({ $value }) => `${$value}%`};
  background: ${({ theme, $color }) => theme.colors[$color]};
  transition: width 0.3s ease;
`;

export const LinearProgress: React.FC<LinearProgressProps> = ({
  progress,
  height = 4,
  color = 'primary'
}) => {
  return (
    <Container>
      <Bar $value={progress} $height={height} $color={color} />
    </Container>
  );
}; 