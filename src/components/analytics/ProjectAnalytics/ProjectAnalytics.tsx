import React from 'react';
import { LineChart } from '../../charts/LineChart';
import { BarChart } from '../../charts/BarChart';
import { PieChart } from '../../charts/PieChart';
import { Card } from '../../Card';
import {
  AnalyticsContainer,
  Header,
  StatCards,
  ChartSection,
  ChartCard,
  MetricsGrid,
  } from './ProjectAnalytics.styles';

interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  monthlyData: Array<{
    month: string;
    projects: number;
    revenue: number;
    completionRate: number;
  }>;
  categoryDistribution: Array<{
    category: string;
    count: number;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
  }>;
  performanceMetrics: {
    onTimeDelivery: number;
    clientSatisfaction: number;
    budgetAdherence: number;
    qualityScore: number;
  };
}

interface ProjectAnalyticsProps {
  metrics: ProjectMetrics;
  dateRange: {
    start: string;
    end: string;
  };
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

export const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({
  metrics,
  dateRange,
  onDateRangeChange,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return '#2196F3';
      case '완료':
        return '#4CAF50';
      case '지연':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const chartData = {
    labels: metrics.monthlyData.map(item => item.month),
    datasets: [
      {
        label: '프로젝트 수',
        data: metrics.monthlyData.map(item => item.projects),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
      }
    ]
  };

  // 월별 완료율 차트 데이터
  const completionRateChartData = {
    labels: metrics.monthlyData.map(item => item.month),
    datasets: [
      {
        label: '완료율',
        data: metrics.monthlyData.map(item => item.completionRate),
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
      }
    ]
  };

  // 성과 지표 차트 데이터
  const performanceChartData = {
    labels: ['정시 납품률', '고객 만족도', '예산 준수율', '품질 점수'],
    datasets: [
      {
        label: '성과 지표',
        data: [
          metrics.performanceMetrics.onTimeDelivery,
          metrics.performanceMetrics.clientSatisfaction,
          metrics.performanceMetrics.budgetAdherence,
          metrics.performanceMetrics.qualityScore,
        ],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      }
    ]
  };

  return (
    <AnalyticsContainer>
      <Header>
        <h2>프로젝트 분석</h2>
        <div>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, start: e.target.value })
            }
          />
          <span>~</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, end: e.target.value })
            }
          />
        </div>
      </Header>

      <StatCards>
        <Card>
          <h3>총 프로젝트</h3>
          <strong>{metrics.totalProjects}</strong>
          <p>진행중: {metrics.activeProjects}</p>
          <p>완료: {metrics.completedProjects}</p>
        </Card>
        <Card>
          <h3>총 수익</h3>
          <strong>{formatCurrency(metrics.totalRevenue)}</strong>
          <p>월 평균: {formatCurrency(metrics.totalRevenue / 12)}</p>
        </Card>
        <Card>
          <h3>성과 지표</h3>
          <p>정시 납품률: {formatPercentage(metrics.performanceMetrics.onTimeDelivery)}</p>
          <p>고객 만족도: {formatPercentage(metrics.performanceMetrics.clientSatisfaction)}</p>
        </Card>
      </StatCards>

      <ChartSection>
        <ChartCard>
          <h3>월별 프로젝트 및 수익 추이</h3>
          <LineChart data={chartData} />
        </ChartCard>

        <ChartCard>
          <h3>카테고리별 분포</h3>
          <PieChart
            data={{
              labels: metrics.categoryDistribution.map(item => item.category),
              datasets: [{
                label: '카테고리별 분포',
                data: metrics.categoryDistribution.map(item => item.count),
                backgroundColor: [
                  '#0066ff',
                  '#ff4405',
                  '#ffd600',
                  '#00b884',
                  '#6c757d',
                  '#dc3545'
                ]
              }]
            }}
          />
        </ChartCard>
      </ChartSection>

      <MetricsGrid>
        <ChartCard>
          <h3>프로젝트 상태 분포</h3>
          <BarChart
            data={{
              labels: metrics.statusDistribution.map(item => item.status),
              datasets: [{
                label: '상태별 프로젝트 수',
                data: metrics.statusDistribution.map(item => item.count),
                backgroundColor: metrics.statusDistribution.map(item => getStatusColor(item.status)),
              }]
            }}
          />
        </ChartCard>

        <ChartCard>
          <h3>월별 완료율</h3>
          <LineChart data={completionRateChartData} />
        </ChartCard>

        <ChartCard>
          <h3>성과 지표</h3>
          <LineChart data={performanceChartData} />
        </ChartCard>
      </MetricsGrid>
    </AnalyticsContainer>
  );
}; 