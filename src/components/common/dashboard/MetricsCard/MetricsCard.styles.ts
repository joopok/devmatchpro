import styled from 'styled-components';

export const Card = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Value = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const TrendIndicator = styled.div<{ direction: 'up' | 'down' | 'neutral', isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.colors.success : theme.colors.error};

  &::before {
    content: '${({ direction }) =>
      direction === 'up' ? '↑' :
      direction === 'down' ? '↓' : '→'}';
  }
`; 