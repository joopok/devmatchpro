import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// ChartJS 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieContainer = styled.div`
  max-width: 400px;
  max-height: 400px;
  width: 100%;
  height: 100%;
`;

export interface PieChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
    }>;
  };
  options?: ChartOptions<'pie'>;
  height?: number;
  width?: number;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  options,
  height,
  width,
}) => {
  const defaultOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value})`;
          }
        }
      }
    },
  };

  return (
    <ChartContainer>
      <PieContainer>
        <Pie
          data={data}
          options={options || defaultOptions}
          height={height}
          width={width}
        />
      </PieContainer>
    </ChartContainer>
  );
}; 