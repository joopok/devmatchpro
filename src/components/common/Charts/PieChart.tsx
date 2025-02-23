import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

interface PieChartProps {
  data: PieChartData;
  options?: any; // 필요한 경우 더 구체적인 타입 정의
}

export const PieChart: React.FC<PieChartProps> = ({ data, options = {} }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Pie data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}; 