import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  variant = 'text',
  animation = 'pulse',
}) => {
  return (
    <Container
      $width={width}
      $height={height}
      $variant={variant}
      $animation={animation}
    />
  );
};

// 여러 개의 Skeleton을 쉽게 생성할 수 있는 유틸리티 컴포넌트
export const SkeletonGroup: React.FC<{
  count: number;
  variant?: 'text' | 'circular' | 'rectangular';
  spacing?: number;
  className?: string;
}> = ({ count, variant = 'text', spacing = 8, className }) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonWrapper key={index} spacing={spacing}>
          <Skeleton variant={variant} />
        </SkeletonWrapper>
      ))}
    </div>
  );
};

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Container = styled.div<{
  $width: number | string;
  $height: number | string;
  $variant: 'text' | 'circular' | 'rectangular';
  $animation: 'pulse' | 'wave' | 'none';
}>`
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width)};
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height)};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ $variant }) => ($variant === 'circular' ? '50%' : '4px')};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonWrapper = styled.div<{ spacing: number }>`
  & + & {
    margin-top: ${({ spacing }) => spacing}px;
  }
`; 