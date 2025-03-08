import styled, { css } from 'styled-components';

interface ButtonContainerProps {
  variant: 'primary' | 'secondary' | 'text' | 'danger';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
}

const getVariantStyles = (variant: ButtonContainerProps['variant']) => {
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

const getSizeStyles = (size: ButtonContainerProps['size']) => {
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