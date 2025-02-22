import { useQuery } from '@tanstack/react-query';
import { analyticsRepository } from '../infrastructure/repositories';
import { GetRevenueMetricsUseCase } from '../core/application/useCases/analytics/GetRevenueMetricsUseCase';

export const useRevenueMetrics = (period: string) => {
  const getRevenueMetricsUseCase = new GetRevenueMetricsUseCase(analyticsRepository);

  return useQuery({
    queryKey: ['revenueMetrics', period],
    queryFn: () => getRevenueMetricsUseCase.execute(period),
  });
}; 