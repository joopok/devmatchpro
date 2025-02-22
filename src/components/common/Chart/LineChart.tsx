import React from 'react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer, ChartTitle } from './Chart.styles';

interface DataPoint {
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  lines: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  xAxisKey: string;
  title?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisKey,
  title,
  height = 300,
}) => {
  return (
    <ChartContainer>
      {title && <ChartTitle>{title}</ChartTitle>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart 
          data={data} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{
              fontSize: '12px',
              paddingTop: '10px'
            }}
          />
          {lines.map(line => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              name={line.name}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};