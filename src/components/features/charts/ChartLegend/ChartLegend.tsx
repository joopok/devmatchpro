import React from 'react';
import {
  LegendContainer,
  LegendItem,
  ColorIndicator,
  LegendLabel,
  ValueLabel,
} from './ChartLegend.styles';

interface LegendData {
  id: string;
  label: string;
  color: string;
  value?: number | string;
  percentage?: number;
  isActive?: boolean;
}

interface ChartLegendProps {
  data: LegendData[];
  orientation?: 'horizontal' | 'vertical';
  showValues?: boolean;
  showPercentages?: boolean;
  onItemClick?: (id: string) => void;
  maxItems?: number;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({
  data,
  orientation = 'horizontal',
  showValues = true,
  showPercentages = true,
  onItemClick,
  maxItems = Infinity,
}) => {
  const displayData = data.slice(0, maxItems);
  const hasMore = data.length > maxItems;

  const formatValue = (value?: number | string) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('ko-KR').format(value);
    }
    return value;
  };

  const formatPercentage = (percentage?: number) => {
    if (typeof percentage !== 'number') return null;
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <LegendContainer $orientation={orientation}>
      {displayData.map(({ id, label, color, value, percentage, isActive }) => (
        <LegendItem
          key={id}
          onClick={() => onItemClick?.(id)}
          $isClickable={!!onItemClick}
          $isActive={isActive !== false}
        >
          <ColorIndicator $color={color} />
          <LegendLabel>{label}</LegendLabel>
          {value && <ValueLabel>{value}</ValueLabel>}
          {percentage && <ValueLabel>({percentage}%)</ValueLabel>}
        </LegendItem>
      ))}
      {hasMore && (
        <LegendItem $isClickable={false} $isActive={true}>
          <LegendLabel>{`외 ${data.length - maxItems}개`}</LegendLabel>
        </LegendItem>
      )}
    </LegendContainer>
  );
};