import styled from 'styled-components';

export const StatsCardContainer = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Value = styled.div`
  margin: 8px 0;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Trend = styled.div<{ isPositive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${({ theme, isPositive }) =>
    isPositive ? theme.colors.success : theme.colors.error};
`;

export const TrendIcon = styled.span<{ isPositive: boolean }>`
  &::before {
    content: "${({ isPositive }) => (isPositive ? '↑' : '↓')}";
  }
`;

export const Description = styled.p`
  margin: 8px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 