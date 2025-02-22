import { Tooltip } from '../../../common/Tooltip';
import { formatTrendValue } from '../../../../utils/format';
import { Card, Title, Value, TrendIndicator } from './MetricsCard.styles';

interface Trend {
  value: number;
  direction: 'up' | 'down' | 'neutral';
  isPositive: boolean;
}

interface MetricsCardProps {
  title: string;
  value: string | number;
  trend: Trend;
  icon?: React.ReactNode;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  trend,
  icon,
}) => {
  return (
    <Tooltip
      content={
        <div>
          <strong>이전 기간 대비:</strong>
          <br />
          {formatTrendValue(trend.value)}
        </div>
      }
      placement="top"
    >
      <TrendIndicator
        direction={trend.direction}
        isPositive={trend.isPositive}
      >
        {formatTrendValue(trend.value)}
      </TrendIndicator>
    </Tooltip>
  );
}; 