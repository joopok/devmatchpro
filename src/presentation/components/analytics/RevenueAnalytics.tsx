import React from 'react';
import { useRevenueMetrics } from '../../../hooks/useAnalytics';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import { Card } from '../../../components/common/Card';
import styled from 'styled-components';
import { TrendIndicator } from './TrendIndicator';
import { RevenueChart } from './RevenueChart';
import { CategoryChart } from './CategoryChart';

const AnalyticsContainer = styled.div`
  // ... styles
`;

const StatCards = styled.div`
  // ... styles
`;

const ChartSection = styled.div`
  // ... styles
`;

const MetricCard: React.FC<{
  title: string;
  value: string;
  trend?: number;
}> = ({ title, value, trend }) => (
  <Card>
    <h3>{title}</h3>
    <strong>{value}</strong>
    {trend && (
      <TrendIndicator positive={trend >= 0}>
        {formatPercentage(trend)} YoY
      </TrendIndicator>
    )}
  </Card>
);

export const RevenueAnalytics: React.FC = () => {
  const { data: metrics, isLoading, error } = useRevenueMetrics('month');

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!metrics) return null;

  return (
    <AnalyticsContainer>
      <StatCards>
        <MetricCard
          title="총 수익"
          value={formatCurrency(metrics.totalRevenue)}
          trend={metrics.growthRate}
        />
        {/* ... 다른 카드들 */}
      </StatCards>
      <ChartSection>
        <RevenueChart data={metrics.monthlyData} />
        <CategoryChart data={metrics.revenueByCategory} />
      </ChartSection>
    </AnalyticsContainer>
  );
}; 