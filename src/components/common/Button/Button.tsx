import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'text' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: ${({ $size }) => 
    $size === 'small' ? '0.375rem 0.75rem' :
    $size === 'large' ? '0.75rem 1.5rem' :
    '0.5rem 1rem'
  };
  font-size: ${({ $size, theme }) =>
    $size === 'small' ? theme.typography.fontSize.sm :
    $size === 'large' ? theme.typography.fontSize.lg :
    theme.typography.fontSize.base
  };
  border-radius: ${({ theme }) => `${theme.borderRadius}px`};
  border: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover { background-color: ${theme.colors.primaryDark}; }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: white;
          &:hover { background-color: ${theme.colors.secondaryDark}; }
        `;
      case 'outline':
        return `
          border: 1px solid ${theme.colors.primary};
          background-color: transparent;
          color: ${theme.colors.primary};
          &:hover { background-color: ${theme.colors.primary}10; }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.error};
          color: white;
          &:hover { background-color: ${theme.colors.errorDark}; }
        `;
      case 'text':
      case 'icon':
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          &:hover { background-color: ${theme.colors.backgroundHover}; }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover { background-color: ${theme.colors.primaryDark}; }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', fullWidth = false, className, ...props }, ref) => (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      className={className}
      {...props}
    />
  )
);

Button.displayName = 'Button';

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Button; 