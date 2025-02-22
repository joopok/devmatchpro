import React from 'react';
import styled from 'styled-components';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary';
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  size = 'medium',
  variant = 'default',
  ...props
}) => {
  return (
    <Button $size={size} $variant={variant} type="button" {...props}>
      {children}
    </Button>
  );
};

const Button = styled.button<{ $size: string; $variant: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small':
        return '4px';
      case 'large':
        return '12px';
      default:
        return '8px';
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  cursor: pointer;
  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      default:
        return theme.colors.text;
    }
  }};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 