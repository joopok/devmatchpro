import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateInput = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
  }
`;

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`; 