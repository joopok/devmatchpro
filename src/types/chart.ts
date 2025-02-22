import { ReactNode } from 'react';

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface BaseChartProps {
  data: ChartData[];
  height?: number;
  format?: (value: number) => string;
}

export interface LineChartProps extends BaseChartProps {
  lines: Array<{
    key: string;
    color: string;
    name: string;
    formatter?: (value: number) => string;
  }>;
  xAxisKey: string;
}

export interface PieChartProps extends BaseChartProps {
  innerRadius?: number;
  outerRadius?: number;
}

export interface BarChartProps extends BaseChartProps {
  bars?: Array<{
    key: string;
    color: string;
    name: string;
    growth?: boolean;
    growthFormat?: (value: number) => string;
  }>;
}

export type ChartType = 'line' | 'bar' | 'pie';

export interface ChartProps {
  type: ChartType;
  data: ChartData[];
  height?: number;
  format?: (value: number) => string;
  lines?: LineChartProps['lines'];
  xAxisKey?: string;
  yAxisKey?: string;
  innerRadius?: number;
  outerRadius?: number;
} 