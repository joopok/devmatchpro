import React from 'react';

interface CategoryChartProps {
  data: any; // 적절한 타입으로 변경하세요
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  return (
    <div>
      {/* 차트 렌더링 로직 */}
      <h2>Category Chart</h2>
    </div>
  );
}; 