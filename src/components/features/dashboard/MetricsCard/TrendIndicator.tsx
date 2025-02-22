import styled from 'styled-components';

interface TrendIndicatorProps {
  direction: 'up' | 'down' | 'neutral';
  isPositive: boolean;
}

export const TrendIndicator = styled.div<TrendIndicatorProps>`
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