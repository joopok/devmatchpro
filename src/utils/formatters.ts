export const formatBudget = (budget: { min: number; max: number; currency: string }) => {
  const formatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: budget.currency,
    maximumFractionDigits: 0,
  });

  if (budget.min === budget.max) {
    return formatter.format(budget.min);
  }

  return `${formatter.format(budget.min)} ~ ${formatter.format(budget.max)}`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTrendValue = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  const percentage = (value * 100).toFixed(1);
  return `${sign}${percentage}%`;
};

export const formatCurrency = (
  amount: number, 
  options: { 
    currency?: string; 
    maximumFractionDigits?: number;
  } = {}
): string => {
  const { 
    currency = 'KRW', 
    maximumFractionDigits = 0 
  } = options;

  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(amount);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ko-KR').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
}; 