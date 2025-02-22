import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer as RechartsResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: Array<Record<string, any>>;
  xAxisKey: string;
  yAxisKey: string;
  height?: number;
  color?: string;
  format?: (value: number) => string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  height = 300,
  color = '#2196F3',
  format = (value) => value.toString(),
}) => {
  return (
    <RechartsResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip formatter={(value) => format(value as number)} />
        <Legend />
        <Bar dataKey={yAxisKey} fill={color} />
      </RechartsBarChart>
    </RechartsResponsiveContainer>
  );
};