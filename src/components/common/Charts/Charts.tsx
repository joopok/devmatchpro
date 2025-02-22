import React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface ChartData {
  [key: string]: string | number;
}

interface ChartProps {
  data: ChartData[];
  type: 'line' | 'bar' | 'pie';
  xKey: string;
  yKey: string | string[];
  height?: number;
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  type,
  xKey,
  yKey,
  height = 300,
  colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className,
}) => {
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {Array.isArray(yKey) ? (
                yKey.map((key) => (
                  <Line key={key} type="monotone" dataKey={key} stroke="#8884d8" />
                ))
              ) : (
                <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {Array.isArray(yKey) ? (
                yKey.map((key) => (
                  <Bar key={key} dataKey={key} fill="#8884d8" />
                ))
              ) : (
                <Bar dataKey={yKey} fill="#8884d8" />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey={yKey as string}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <ChartContainer className={className} height={height}>
      {renderChart()}
    </ChartContainer>
  );
};

const ChartContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
`; 