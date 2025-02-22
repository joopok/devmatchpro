import styled from 'styled-components';

export const VisualizationContainer = styled.div`
  padding: 16px;
`;

export const Controls = styled.div`
  margin-bottom: 16px;
`;

export const ChartContainer = styled.div`
  margin-top: 16px;
`;

export const Legend = styled.div`
  // ...
`;

export const Tooltip = styled.div`
  padding: 8px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ExportOptions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`; 