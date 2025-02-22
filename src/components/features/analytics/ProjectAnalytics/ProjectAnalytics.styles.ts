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
  margin-bottom: 24px;
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

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`; 