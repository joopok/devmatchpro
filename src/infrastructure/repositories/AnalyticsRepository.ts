import { IAnalyticsRepository } from '../../core/domain/repositories/IAnalyticsRepository';
import { RevenueMetrics, ProjectMetrics } from '../../core/domain/entities/Analytics';
import { supabase } from '../config/supabase';

export class AnalyticsRepository implements IAnalyticsRepository {
  async getRevenueMetrics(period: string): Promise<RevenueMetrics> {
    const { data, error } = await supabase
      .rpc('get_revenue_metrics', { period_param: period });
    
    if (error) throw new Error(error.message);
    return data;
  }

  async getProjectMetrics(dateRange: { start: string; end: string }): Promise<ProjectMetrics> {
    const { data, error } = await supabase
      .rpc('get_project_metrics', dateRange);
    
    if (error) throw new Error(error.message);
    return data;
  }
} 