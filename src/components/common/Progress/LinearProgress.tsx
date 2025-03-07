import React from 'react';
import styled from 'styled-components';

interface LinearProgressProps {
  progress?: number;
  value?: number; // 호환성을 위한 다른 이름의 prop
  max?: number;
  height?: number;
  color?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  overflow: hidden;
  position: relative;
`;

const Bar = styled.div<{ 
  $value: number; 
  $height?: number; 
  $color: string;
  $size?: string; 
}>`
  height: ${({ $height, $size }) => {
    if ($height) return `${$height}px`;
    
    switch ($size) {
      case 'small':
        return '4px';
      case 'large':
        return '12px';
      default:
        return '8px';
    }
  }};
  width: ${({ $value }) => `${$value}%`};
  background: ${({ theme, $color }) => theme.colors[$color]};
  transition: width 0.3s ease;
`;

const Label = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LinearProgress: React.FC<LinearProgressProps> = ({
  progress,
  value,
  max = 100,
  height,
  color = 'primary',
  size = 'medium',
  showLabel = false
}) => {
  // progress와 value 둘 중 하나 사용 (호환성)
  const progressValue = progress ?? value ?? 0;
  const percentage = Math.min(Math.max((progressValue / max) * 100, 0), 100);
  
  return (
    <Container>
      <Bar 
        $value={percentage} 
        $height={height} 
        $color={color} 
        $size={size} 
      />
      {showLabel && (
        <Label>{Math.round(percentage)}%</Label>
      )}
    </Container>
  );
}; 