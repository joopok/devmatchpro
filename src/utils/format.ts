export const formatTrendValue = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  const percentage = (value * 100).toFixed(1);
  return `${sign}${percentage}%`;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ko-KR').format(value);
}; 