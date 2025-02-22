import { RevenueMetrics } from '../../../domain/entities/Analytics';
import { IAnalyticsRepository } from '../../../domain/repositories/IAnalyticsRepository';

export class GetRevenueMetricsUseCase {
  constructor(private analyticsRepository: IAnalyticsRepository) {}

  async execute(period: string): Promise<RevenueMetrics> {
    return this.analyticsRepository.getRevenueMetrics(period);
  }
} 