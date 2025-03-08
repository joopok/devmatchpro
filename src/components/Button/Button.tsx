import React from 'react';
import styled from 'styled-components';
// import { Theme } from '../../../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'text' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $iconOnly?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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

  ${({ $iconOnly }) => $iconOnly && `
    padding: 0.5rem;
  `}

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
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          &:hover { background-color: ${theme.colors.backgroundHover}; }
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        `;
      case 'icon':
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          border-radius: 50%;
          padding: 0.5rem;
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
    pointer-events: none;
  }
`;

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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'medium', 
    fullWidth = false, 
    className, 
    children, 
    loading, 
    icon, 
    iconPosition = 'left',
    ...props 
  }, ref) => {
    const iconOnly = !children && !!icon;
    
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $iconOnly={iconOnly}
        className={className}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {icon && iconPosition === 'left' && <IconWrapper>{icon}</IconWrapper>}
            {children}
            {icon && iconPosition === 'right' && <IconWrapper>{icon}</IconWrapper>}
          </>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button; 