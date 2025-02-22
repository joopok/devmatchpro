// 프로젝트 분석 관련 타입 정의 필요 

// 수익 분석 관련 타입 정의 필요 

export interface AnalyticsData {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  dateRange: {
    start: string;
    end: string;
  };
  metrics: {
    totalRevenue: number;
    projectCount: number;
    averageProjectDuration: number;
    clientSatisfactionRate: number;
  };
  trends: {
    date: string;
    revenue: number;
    projectCount: number;
  }[];
  categoryDistribution: {
    category: string;
    count: number;
    percentage: number;
  }[];
}

export type ChartType = 'line' | 'bar' | 'pie';