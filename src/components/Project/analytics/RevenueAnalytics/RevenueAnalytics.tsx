import React from 'react';
import { LineChart } from '../../../common/Charts/LineChart';
import { BarChart } from '../../../common/Charts/BarChart';
import { Card } from '../../../common/Card';
import {
  AnalyticsContainer,
  Header,
  StatCards,
  ChartSection,
  ChartCard,
  TrendIndicator,
} from './RevenueAnalytics.styles';

interface RevenueMetrics {
  totalRevenue: number;
  averageProjectValue: number;
  activeProjects: number;
  growthRate?: number;
  monthlyData: Array<{
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }>;
  revenueByCategory: Array<{
    category: string;
    amount: number;
    growth: number;
  }>;
}

interface RevenueAnalyticsProps {
  metrics: RevenueMetrics;
  period: 'month' | 'quarter' | 'year';
  onPeriodChange: (period: 'month' | 'quarter' | 'year') => void;
}

export const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({
  metrics,
  period,
  onPeriodChange,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${(value * 100).toFixed(1)}%`;
  };

  const revenueChartData = {
    labels: metrics.monthlyData.map(item => item.month),
    datasets: [
      {
        label: '수익',
        data: metrics.monthlyData.map(item => item.revenue),
        color: '#4CAF50',
      },
      {
        label: '비용',
        data: metrics.monthlyData.map(item => item.expenses),
        color: '#F44336',
      }
    ]
  };

  return (
    <AnalyticsContainer>
      <Header>
        <h2>수익 분석</h2>
        <div>
          <button
            className={period === 'month' ? 'active' : ''}
            onClick={() => onPeriodChange('month')}
          >
            월간
          </button>
          <button
            className={period === 'quarter' ? 'active' : ''}
            onClick={() => onPeriodChange('quarter')}
          >
            분기
          </button>
          <button
            className={period === 'year' ? 'active' : ''}
            onClick={() => onPeriodChange('year')}
          >
            연간
          </button>
        </div>
      </Header>

      <StatCards>
        <Card>
          <h3>총 수익</h3>
          <strong>{formatCurrency(metrics.totalRevenue)}</strong>
          <TrendIndicator positive={Boolean(metrics.growthRate && metrics.growthRate >= 0)}>
            {formatPercentage(metrics.growthRate || 0)} YoY
          </TrendIndicator>
        </Card>
        <Card>
          <h3>월 평균 수익</h3>
          <strong>{formatCurrency(metrics.averageProjectValue)}</strong>
          <p>예상 연 수익: {formatCurrency(metrics.totalRevenue)}</p>
        </Card>
      </StatCards>

      <ChartSection>
        <ChartCard>
          <h3>수익 및 비용 추이</h3>
          <LineChart data={revenueChartData} />
        </ChartCard>

        <ChartCard>
          <h3>카테고리별 수익</h3>
          <BarChart
            data={metrics.revenueByCategory.map((item) => ({
              name: item.category,
              value: item.amount,
              growth: item.growth,
            }))}
            xAxisKey="name"
            yAxisKey="value"
            height={300}
            format={formatCurrency}
          />
        </ChartCard>
      </ChartSection>
    </AnalyticsContainer>
  );
}; 