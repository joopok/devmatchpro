export interface RevenueMetrics {
  totalRevenue: number;
  averageProjectValue: number;
  activeProjects: number;
  growthRate: number;
  monthlyData: MonthlyRevenueData[];
  revenueByCategory: RevenueCategoryData[];
}

export interface MonthlyRevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface RevenueCategoryData {
  category: string;
  amount: number;
  growth: number;
}

export interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  performanceMetrics: PerformanceMetrics;
  monthlyData: MonthlyProjectData[];
  categoryDistribution: CategoryDistribution[];
}

export interface PerformanceMetrics {
  onTimeDelivery: number;
  clientSatisfaction: number;
  budgetAdherence: number;
  qualityScore: number;
}

export interface MonthlyProjectData {
  month: string;
  projects: number;
  completionRate: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
} 