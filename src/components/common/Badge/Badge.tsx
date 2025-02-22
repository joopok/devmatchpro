import React from 'react';
import styled, { css } from 'styled-components';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  content: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  overlap?: boolean;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  content,
  variant = 'default',
  size = 'medium',
  dot = false,
  overlap = false,
  children,
}) => {
  return (
    <BadgeWrapper>
      {children}
      <BadgeContent
        variant={variant}
        size={size}
        dot={dot}
        overlap={overlap}
        hasChildren={!!children}
      >
        {!dot && content}
      </BadgeContent>
    </BadgeWrapper>
  );
};

const BadgeWrapper = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
`;

const getBadgeSize = (size: BadgeSize, dot: boolean) => {
  if (dot) {
    switch (size) {
      case 'small':
        return '6px';
      case 'large':
        return '12px';
      default:
        return '8px';
    }
  }

  switch (size) {
    case 'small':
      return '16px';
    case 'large':
      return '24px';
    default:
      return '20px';
  }
};

const getBadgeColor = (variant: BadgeVariant, theme: any) => {
  switch (variant) {
    case 'primary':
      return theme.colors.primary;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    case 'info':
      return theme.colors.info;
    default:
      return theme.colors.gray;
  }
};

const BadgeContent = styled.span<{
  variant: BadgeVariant;
  size: BadgeSize;
  dot: boolean;
  overlap: boolean;
  hasChildren: boolean;
}>`
  position: ${({ hasChildren }) => (hasChildren ? 'absolute' : 'relative')};
  display: flex;
  flex-flow: row wrap;
  place-content: center;
  align-items: center;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 12px;
  min-width: ${({ size, dot }) => getBadgeSize(size, dot)};
  height: ${({ size, dot }) => getBadgeSize(size, dot)};
  padding: ${({ dot }) => (dot ? '0' : '0 6px')};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ variant, theme }) => getBadgeColor(variant, theme)};
  border-radius: ${({ dot }) => (dot ? '50%' : '10px')};
  
  ${({ overlap, hasChildren }) =>
    overlap &&
    hasChildren &&
    css`
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      transform-origin: 100% 0%;
    `}

  ${({ hasChildren, overlap }) =>
    hasChildren &&
    !overlap &&
    css`
      top: -2px;
      right: -2px;
    `}
`; 