import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'text' | 'icon';
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  &.primary {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  &.secondary {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
    }
  }

  &.outline {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary}33;
    }
  }

  &.danger {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.errorDark};
    }
  }

  &.text {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundHover};
    }
  }

  &.icon {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundHover};
    }
  }
`;