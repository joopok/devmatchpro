import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'text' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonContainerProps {
  variant: 'primary' | 'secondary' | 'text' | 'danger';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
}
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

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $iconOnly?: boolean;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $iconOnly?: boolean;
}
interface ButtonContainerProps {
  variant: 'primary' | 'secondary' | 'text' | 'danger';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $iconOnly?: boolean;
}



export const getVariantStyles = (variant: ButtonContainerProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
        &:hover {
          background-color: ${({ theme }) => theme.colors.primaryDark};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.text};
        &:hover {
          background-color: ${({ theme }) => theme.colors.secondaryDark};
        }
      `;
    case 'danger':
      return css`
        background-color: ${({ theme }) => theme.colors.error};
        color: white;
        &:hover {
          background-color: ${({ theme }) => theme.colors.errorDark};
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        padding: 0;
        &:hover {
          text-decoration: underline;
        }
      `;
  }
};

export const getSizeStyles = (size: ButtonContainerProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px 16px;
        font-size: 14px;
      `;
    case 'medium':
      return css`
        padding: 12px 24px;
        font-size: 16px;
      `;
    case 'large':
      return css`
        padding: 16px 32px;
        font-size: 18px;
      `;
  }
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
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

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinner = styled.div`
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