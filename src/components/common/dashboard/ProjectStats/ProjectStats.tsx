import React from 'react';
import { StatsCard } from '../../../common/Stats/StatsCard';
import { LineChart } from '../../../common/charts/LineChart';
import {
  StatsContainer,
  StatsGrid,
  ChartSection,
  ChartTitle,
} from './ProjectStats.styles';

interface ProjectStatsProps {
  stats: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    successRate: number;
    monthlyStats: Array<{
      month: string;
      projects: number;
      revenue: number;
    }>;
  };
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ stats }) => {
  const formattedData = {
    labels: stats.monthlyStats.map(stat => stat.month),
    datasets: [
      {
        label: '프로젝트',
        data: stats.monthlyStats.map(stat => stat.projects),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: false
      },
      {
        label: '수익 (만원)',
        data: stats.monthlyStats.map(stat => stat.revenue / 10000),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: false
      }
    ]
  };

  return (
    <StatsContainer>
      <StatsGrid>
        <StatsCard
          title="전체 프로젝트"
          value={stats.totalProjects}
          trend={{
            value: 12,
            isPositive: true,
          }}
          description="전월 대비"
        />
        <StatsCard
          title="진행중 프로젝트"
          value={stats.activeProjects}
          description="현재 진행중"
        />
        <StatsCard
          title="완료된 프로젝트"
          value={stats.completedProjects}
          trend={{
            value: 8,
            isPositive: true,
          }}
          description="전월 대비"
        />
        <StatsCard
          title="성공률"
          value={`${stats.successRate}%`}
          trend={{
            value: 5,
            isPositive: true,
          }}
          description="전월 대비"
        />
      </StatsGrid>

      <ChartSection>
        <ChartTitle>월별 프로젝트 현황</ChartTitle>
        <LineChart
          data={formattedData}
          height={300}
        />
      </ChartSection>
    </StatsContainer>
  );
}; 