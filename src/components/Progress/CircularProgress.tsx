import React from 'react';
import styled from 'styled-components';

interface CircularProgressProps {
  value: number;
  size?: number;
  label?: string;
  color?: string;
}

const Container = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.svg`
  transform: rotate(-90deg);
`;

const Background = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border};
`;

const Progress = styled.circle<{ $color?: string }>`
  fill: none;
  stroke: ${({ theme, $color }) => $color || theme.colors.primary};
  transition: stroke-dashoffset 0.3s;
`;

const Label = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 100,
  label,
  color,
}) => {
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, value));
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Container>
      <Circle width={size} height={size}>
        <Background
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Progress
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          $color={color}
        />
      </Circle>
      <Label>
        <strong>{progress}%</strong>
        {label && <small>{label}</small>}
      </Label>
    </Container>
  );
}; 