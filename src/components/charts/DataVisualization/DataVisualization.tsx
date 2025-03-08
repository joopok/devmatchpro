import React, { useState, useMemo } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
} from '..';
import { Select } from '../../Select';
import { DateRangePicker } from '../../DateTimeSelector';
import { Card } from '../../Card';
import { Button } from '../../Button';
import {
  VisualizationContainer,
  Controls,
  ChartContainer,
  Legend,
  Tooltip,
  ExportOptions,
} from './DataVisualization.styles';
import { theme } from '../../../styles/theme';

interface DataPoint {
  date: string;
  value: number;
  category?: string;
  label?: string;
}

interface ChartConfig {
  type: 'line' | 'bar' | 'pie';
  showLegend: boolean;
  showGrid: boolean;
  stacked?: boolean;
  smoothing?: boolean;
  dateFormat?: string;
  valueFormat?: string;
}

interface DataVisualizationProps {
  data: DataPoint[];
  title: string;
  description?: string;
  config?: Partial<ChartConfig>;
  onExport?: (format: 'png' | 'svg' | 'csv') => void;
  onDateRangeChange?: (range: { start: string; end: string }) => void;
  onConfigChange?: (config: ChartConfig) => void;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  data,
  title,
  description,
  config: initialConfig,
  onExport,
  onDateRangeChange,
  onConfigChange,
}) => {
  const [config, setConfig] = useState<ChartConfig>({
    type: 'line',
    showLegend: true,
    showGrid: true,
    stacked: false,
    smoothing: false,
    dateFormat: 'YYYY-MM-DD',
    valueFormat: '0,0',
    ...initialConfig,
  });

  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const processedData = useMemo(() => {
    let filtered = [...data];

    if (selectedRange) {
      filtered = filtered.filter(
        (point) =>
          point.date >= selectedRange.start && point.date <= selectedRange.end
      );
    }

    return filtered;
  }, [data, selectedRange]);

  const handleConfigChange = (updates: Partial<ChartConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  const handleRangeChange = (range: { start: string; end: string }) => {
    setSelectedRange(range);
    onDateRangeChange?.(range);
  };

  const renderChart = () => {
    switch (config.type) {
      case 'line':
        const chartData = {
          labels: processedData.map(item => item.date),
          datasets: [
            {
              label: config.valueFormat || '값',
              data: processedData.map(item => item.value),
              color: theme.colors.primary,
            }
          ]
        };
        return <LineChart data={chartData} />;
      case 'bar':
        return (
          <BarChart
            data={{
              labels: processedData.map(item => item.date),
              datasets: [{
                label: config.valueFormat || '값',
                data: processedData.map(item => item.value),
                backgroundColor: theme.colors.primary
              }]
            }}
            height={300}
          />
        );
      case 'pie':
        return (
          <PieChart
            data={{
              labels: data.map(point => point.label || '미분류'),
              datasets: [{
                label: '데이터',
                data: data.map(point => point.value),
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
        );
      default:
        return null;
    }
  };

  return (
    <VisualizationContainer>
      <Controls>
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>

        <div>
          <Select
            value={config.type}
            onChange={(value) => handleConfigChange({ type: value as ChartConfig['type'] })}
            options={[
              { value: 'line', label: '선 그래프' },
              { value: 'bar', label: '막대 그래프' },
              { value: 'pie', label: '파이 차트' },
            ]}
          />

          <DateRangePicker
            name="dateRange"
            onChange={(value) => {
              if (typeof value === 'object' && value !== null && 'start' in value) {
                handleRangeChange(value as { start: string; end: string });
              }
            }}
            startDate={selectedRange?.start ? new Date(selectedRange.start) : null}
            endDate={selectedRange?.end ? new Date(selectedRange.end) : null}
          />
        </div>

        <div>
          <Select
            value={config.showLegend ? 'show' : 'hide'}
            onChange={(value) => handleConfigChange({ showLegend: value === 'show' })}
            options={[
              { value: 'show', label: '범례 표시' },
              { value: 'hide', label: '범례 숨기기' },
            ]}
          />
          <Select
            value={config.showGrid ? 'show' : 'hide'}
            onChange={(value) => handleConfigChange({ showGrid: value === 'show' })}
            options={[
              { value: 'show', label: '그리드 표시' },
              { value: 'hide', label: '그리드 숨기기' },
            ]}
          />
          {config.type === 'line' && (
            <Select
              value={config.smoothing ? 'on' : 'off'}
              onChange={(value) => handleConfigChange({ smoothing: value === 'on' })}
              options={[
                { value: 'on', label: '스무딩 켜기' },
                { value: 'off', label: '스무딩 끄기' },
              ]}
            />
          )}
          {config.type === 'bar' && (
            <Select
              value={config.stacked ? 'stacked' : 'grouped'}
              onChange={(value) => handleConfigChange({ stacked: value === 'stacked' })}
              options={[
                { value: 'stacked', label: '스택드' },
                { value: 'grouped', label: '그룹드' },
              ]}
            />
          )}
        </div>
      </Controls>

      <ChartContainer>
        <Card>
          {renderChart()}
          {config.showLegend && <Legend />}
          {hoveredPoint && (
            <Tooltip>
              <div>날짜: {hoveredPoint.date}</div>
              <div>값: {hoveredPoint.value}</div>
              {hoveredPoint.category && (
                <div>카테고리: {hoveredPoint.category}</div>
              )}
              {hoveredPoint.label && <div>라벨: {hoveredPoint.label}</div>}
            </Tooltip>
          )}
        </Card>
      </ChartContainer>

      {onExport && (
        <ExportOptions>
          <Button onClick={() => onExport('png')}>PNG로 내보내기</Button>
          <Button onClick={() => onExport('svg')}>SVG로 내보내기</Button>
          <Button onClick={() => onExport('csv')}>CSV로 내보내기</Button>
        </ExportOptions>
      )}
    </VisualizationContainer>
  );
};