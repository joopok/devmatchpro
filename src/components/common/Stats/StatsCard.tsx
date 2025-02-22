import React from 'react';
import * as S from './StatsCard.styles';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  description,
}) => {
  return (
    <S.StatsCardContainer>
      <S.Title>{title}</S.Title>
      <S.Value>{value}</S.Value>
      {trend && (
        <S.Trend isPositive={trend.isPositive}>
          <S.TrendIcon isPositive={trend.isPositive} />
          {trend.value}%
        </S.Trend>
      )}
      {description && <S.Description>{description}</S.Description>}
    </S.StatsCardContainer>
  );
}; 