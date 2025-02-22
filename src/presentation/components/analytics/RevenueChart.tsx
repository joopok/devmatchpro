import React from 'react';

interface RevenueChartProps {
  data: any; // 적절한 타입으로 변경하세요
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div>
      {/* 차트 렌더링 로직 */}
      <h2>Revenue Chart</h2>
    </div>
  );
}; 