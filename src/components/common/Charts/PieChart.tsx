import React from 'react';
import { BaseChart, BaseChartProps } from './BaseChart';

interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

interface PieChartProps extends Omit<BaseChartProps, 'data'> {
  data: PieChartData[];
  height?: number;
  format?: (value: number) => string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  height = 300,
  format = (value) => value.toString(),
  ...rest
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <BaseChart data={data} height={height} {...rest}>
      <svg width="100%" height={height} viewBox="-1 -1 2 2">
        {data.map((item, index) => {
          const percentage = item.value / total;
          const angle = percentage * Math.PI * 2;
          const x1 = Math.cos(currentAngle);
          const y1 = Math.sin(currentAngle);
          const x2 = Math.cos(currentAngle + angle);
          const y2 = Math.sin(currentAngle + angle);
          const largeArc = percentage > 0.5 ? 1 : 0;
          
          const pathData = [
            `M ${x1} ${y1}`,
            `A 1 1 0 ${largeArc} 1 ${x2} ${y2}`,
            'L 0 0',
          ].join(' ');
          
          const path = (
            <path
              key={item.name}
              d={pathData}
              fill={item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`}
            />
          );
          
          currentAngle += angle;
          return path;
        })}
      </svg>
    </BaseChart>
  );
}; 