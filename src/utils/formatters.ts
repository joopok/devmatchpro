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


export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${(value * 100).toFixed(1)}%`;
}; 