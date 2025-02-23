export const CHART_COLORS = {
  primary: '#0066ff',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8',
  secondary: '#6c757d',
  orange: '#ff4405',
  yellow: '#ffd600',
  green: '#00b884',
} as const;

export const getChartColors = (count: number): string[] => {
  const colors = Object.values(CHART_COLORS);
  const result: string[] = [];
  
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  
  return result;
}; 