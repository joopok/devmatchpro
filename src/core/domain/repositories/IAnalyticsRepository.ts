import { RevenueMetrics, ProjectMetrics } from '../entities/Analytics';

export interface IAnalyticsRepository {
  getRevenueMetrics(period: string): Promise<RevenueMetrics>;
  getProjectMetrics(dateRange: { start: string; end: string }): Promise<ProjectMetrics>;
} 