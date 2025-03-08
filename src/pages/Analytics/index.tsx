import React from 'react';
import styled from 'styled-components';
import { RevenueAnalytics } from '../../components/analytics/RevenueAnalytics/RevenueAnalytics';

const AnalyticsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Analytics = () => {
  return (
    <AnalyticsContainer>
      <h1>분석</h1>
      <RevenueAnalytics 
        metrics={{
          totalRevenue: 0,
          averageProjectValue: 0,
          activeProjects: 0,
          growthRate: 0,
          monthlyData: [],
          revenueByCategory: []
        }}
        period="month"
        onPeriodChange={() => {}}
      />
    </AnalyticsContainer>
  );
};

export default Analytics; 