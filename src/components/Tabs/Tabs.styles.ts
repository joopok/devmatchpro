import styled, { css } from 'styled-components';

interface TabListProps {
  variant: 'default' | 'contained' | 'pills';
  fullWidth: boolean;
}

interface TabButtonProps {
  active: boolean;
  variant: 'default' | 'contained' | 'pills';
  fullWidth: boolean;
}

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TabList = styled.div<TabListProps>`
  position: relative;
  display: flex;
  gap: 2px;
  ${({ variant }) =>
    variant === 'contained' &&
    css`
      background-color: ${({ theme }) => theme.colors.backgroundAlt};
      padding: 4px;
      border-radius: ${({ theme }) => theme.borderRadius}px;
    `}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

export const TabButton = styled.button<TabButtonProps>`
  position: relative;
  padding: 12px 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.textSecondary};
  transition: all 0.2s ease;
  white-space: nowrap;
  
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      flex: 1;
    `}

  ${({ variant, active, theme }) => {
    switch (variant) {
      case 'contained':
        return css`
          border-radius: ${theme.borderRadius}px;
          background-color: ${active ? theme.colors.surface : 'transparent'};
        `;
      case 'pills':
        return css`
          border-radius: 9999px;
          background-color: ${active ? theme.colors.primary : 'transparent'};
          color: ${active ? theme.colors.white : theme.colors.textSecondary};
        `;
      default:
        return '';
    }
  }}
`;

export const TabContent = styled.div`
  margin-top: 24px;
`; 