import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonStyleProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $iconOnly?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const sizeStyles = {
  small: css`
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
  `,
  medium: css`
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 1rem;
  `,
  large: css`
    height: 3rem;
    padding: 0 1.5rem;
    font-size: 1.125rem;
  `
};

const variantStyles = {
  primary: css`
    background-color: var(--bs-primary, #0d6efd);
    color: #fff;
    border: 1px solid var(--bs-primary, #0d6efd);
    
    &:hover:not(:disabled) {
      background-color: var(--bs-primary-dark, #0a58ca);
      border-color: var(--bs-primary-dark, #0a58ca);
    }
    
    &:active:not(:disabled) {
      background-color: var(--bs-primary-darker, #084298);
      border-color: var(--bs-primary-darker, #084298);
    }
  `,
  secondary: css`
    background-color: var(--bs-secondary, #6c757d);
    color: #fff;
    border: 1px solid var(--bs-secondary, #6c757d);
    
    &:hover:not(:disabled) {
      background-color: var(--bs-secondary-dark, #5a6268);
      border-color: var(--bs-secondary-dark, #5a6268);
    }
    
    &:active:not(:disabled) {
      background-color: var(--bs-secondary-darker, #4e555b);
      border-color: var(--bs-secondary-darker, #4e555b);
    }
  `,
  danger: css`
    background-color: var(--bs-danger, #dc3545);
    color: #fff;
    border: 1px solid var(--bs-danger, #dc3545);
    
    &:hover:not(:disabled) {
      background-color: var(--bs-danger-dark, #c82333);
      border-color: var(--bs-danger-dark, #c82333);
    }
    
    &:active:not(:disabled) {
      background-color: var(--bs-danger-darker, #bd2130);
      border-color: var(--bs-danger-darker, #bd2130);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: var(--bs-body-color, #212529);
    border: 1px solid var(--bs-border-color, #dee2e6);
    
    &:hover:not(:disabled) {
      background-color: var(--bs-light, #f8f9fa);
    }
    
    &:active:not(:disabled) {
      background-color: var(--bs-light-dark, #e9ecef);
    }
  `,
  link: css`
    background-color: transparent;
    color: var(--bs-primary, #0d6efd);
    border: none;
    padding: 0;
    text-decoration: none;
    
    &:hover:not(:disabled) {
      text-decoration: underline;
      background-color: transparent;
    }
    
    &:active:not(:disabled) {
      color: var(--bs-primary-dark, #0a58ca);
    }
  `
};

export const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  /* 크기 스타일 적용 */
  ${({ $size }) => sizeStyles[$size]};
  
  /* 아이콘만 있는 경우 정사각형 버튼으로 만들기 */
  ${({ $iconOnly, $size }) => $iconOnly && css`
    width: ${$size === 'small' ? '2rem' : $size === 'medium' ? '2.5rem' : '3rem'};
    padding: 0;
  `};
  
  /* 넓이 100% 스타일 */
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `};
  
  /* 버튼 유형별 스타일 적용 */
  ${({ $variant }) => variantStyles[$variant]};
  
  /* 비활성화 스타일 */
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  
  /* 포커스 스타일 */
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb, 13, 110, 253), 0.25);
  }
`; 