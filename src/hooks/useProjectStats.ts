import { useQuery } from '@tanstack/react-query';

interface ProjectStats {
  statusDistribution: Array<{ status: string; count: number }>;
  monthlyTrends: Array<{
    month: string;
    completed: number;
    ongoing: number;
    planned: number;
  }>;
  departmentBudgets: Array<{ department: string; budget: number }>;
}

export const useProjectStats = () => {
  return useQuery<ProjectStats>({
    queryKey: ['projectStats'],
    queryFn: async () => {
      // TODO: API 호출 구현
      return {
        statusDistribution: [],
        monthlyTrends: [],
        departmentBudgets: [],
      };
    },
  });
}; 