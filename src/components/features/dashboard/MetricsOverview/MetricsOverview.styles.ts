import styled from 'styled-components';

export const OverviewContainer = styled.div`
  padding: 20px;
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TrendIndicator = styled.div<{
  direction: 'up' | 'down';
  isPositive: boolean;
}>`
  color: ${({ isPositive }) => (isPositive ? '#4caf50' : '#f44336')};
  display: flex;
  align-items: center;
  gap: 4px;
`; 