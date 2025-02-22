import styled from 'styled-components';

export const StatsContainer = styled.div`
  padding: 24px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const ChartSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const ChartTitle = styled.h3`
  margin-bottom: 24px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`; 