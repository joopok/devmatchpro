import React from 'react';
import { Container } from './BaseChart.styles';

export interface ChartData {
  [key: string]: string | number;
}

export interface BaseChartProps {
  children: React.ReactNode;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  onHover?: (point: ChartData) => void;
  dateFormat?: string;
  valueFormat?: string;
  data: any[];
}

export const BaseChart: React.FC<BaseChartProps> = ({
  children,
  height = 300,
  data,
  ...rest
}) => {
  return (
    <Container style={{ height }}>
      {children}
    </Container>
  );
}; 