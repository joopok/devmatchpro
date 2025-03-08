import React from 'react';
import { Card } from '../../Card';
import { LineChart } from '../../Charts/LineChart';
import { ProgressBar } from '../../Progress';
import { 
  BarChart2, 
  Users, 
  Clock, 
  Activity, 
  DollarSign,
  FileText,
  Star
} from 'lucide-react';
import {
  OverviewContainer,
  TrendIndicator,
  MetricGrid,
  CardHeader,
  CardContent,
} from './MetricsOverview.styles';

// 아이콘 매핑 객체 정의
const ICONS = {
  'bar-chart': BarChart2,
  'users': Users,
  'clock': Clock,
  'activity': Activity,
  'dollar-sign': DollarSign,
  'file-text': FileText,
  'star': Star,
};

type IconName = keyof typeof ICONS;

interface Metric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    isPositive: boolean;
  };
  chart?: {
    data: Array<{ date: string; value: number }>;
    color: string;
  };
  progress?: {
    current: number;
    target: number;
    color?: string;
  };
  icon?: IconName;
}

interface MetricsOverviewProps {
  metrics: Metric[];
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  onPeriodChange: (period: string) => void;
  isLoading?: boolean;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  metrics,
  period,
  onPeriodChange,
  isLoading,
}) => {
  const formatValue = (value: number, unit?: string) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M${unit || ''}`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K${unit || ''}`;
    }
    return `${value}${unit || ''}`;
  };

  const formatTrendValue = (value: number) => {
    return value > 0 ? `+${value}%` : `${value}%`;
  };

  return (
    <OverviewContainer>
      <div>
        <h2>주요 지표</h2>
        <select
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          disabled={isLoading}
        >
          <option value="daily">일간</option>
          <option value="weekly">주간</option>
          <option value="monthly">월간</option>
          <option value="yearly">연간</option>
        </select>
      </div>

      <MetricGrid>
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader>
              <h3>{metric.label}</h3>
              {metric.icon && React.createElement(ICONS[metric.icon as IconName])}
            </CardHeader>
            <CardContent>
              <div>{formatValue(metric.value)}</div>
              {metric.trend && (
                <TrendIndicator
                  direction={metric.trend.direction}
                  isPositive={metric.trend.isPositive}
                >
                  {formatTrendValue(metric.trend.value)}
                </TrendIndicator>
              )}
            </CardContent>
          </Card>
        ))}
      </MetricGrid>
    </OverviewContainer>
  );
}; 