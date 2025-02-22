import React from 'react';
import { LineChart } from './LineChart';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

interface ChartProps {
  type: 'line' | 'bar';
  data: ChartData;
  height?: number;
}

export const Chart: React.FC<ChartProps> = ({ type, data, height = 300 }) => {
  switch (type) {
    case 'line':
      return <LineChart data={data} />;
    case 'bar':
      return <div>Bar Chart - Coming Soon</div>;
    default:
      return null;
  }
}; 