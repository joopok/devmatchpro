import { ReactNode } from 'react';

export interface BaseChartProps {
  height?: number;
  width?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }[];
}

export interface ChartProps extends BaseChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'area' | 'horizontalBar' | 'mixed';
  data: ChartData;
}

export interface LineChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor?: string;
      tension?: number;
    }[];
  };
}

export interface BarChartProps extends BaseChartProps {
  data: Array<Record<string, any>>;
  xAxisKey: string;
  yAxisKey: string;
  color?: string;
}

export interface PieChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
}

export interface DoughnutChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  cutout?: string | number;
}

export interface RadarChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth?: number;
    }[];
  };
}

export interface PolarAreaChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
}

export interface AreaChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill?: boolean;
      tension?: number;
    }[];
  };
}

export interface HorizontalBarChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
}

export interface MixedChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      type: 'line' | 'bar';
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      yAxisID?: string;
      fill?: boolean;
      order?: number;
    }[];
  };
} 