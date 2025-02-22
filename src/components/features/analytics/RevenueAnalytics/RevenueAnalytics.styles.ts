import styled from 'styled-components';

export const AnalyticsContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h2 {
    margin: 0;
    font-size: 24px;
  }
  
  div {
    display: flex;
    gap: 8px;
    
    button {
      padding: 8px 16px;
      border-radius: ${({ theme }) => theme.borderRadius}px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      background: none;
      cursor: pointer;
      
      &.active {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

export const StatCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

export const ChartSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 24px;
`;

export const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const TrendIndicator = styled.div<{ positive: boolean }>`
  color: ${({ theme, positive }) =>
    positive ? theme.colors.success : theme.colors.error};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '${({ positive }) => (positive ? '↑' : '↓')}';
  }
`; 