import React from 'react';
import { StatsCard } from '../../../common/Stats/StatsCard';
import { LineChart } from '../../../common/Chart/LineChart';
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
  const chartData = stats.monthlyStats.map((stat) => ({
    name: stat.month,
    프로젝트: stat.projects,
    수익: stat.revenue / 10000, // 만원 단위로 변환
  }));

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
          data={chartData}
          lines={[
            { key: '프로젝트', color: '#4CAF50', name: '프로젝트 수' },
            { key: '수익', color: '#2196F3', name: '수익 (만원)' },
          ]}
          xAxisKey="name"
          height={300}
        />
      </ChartSection>
    </StatsContainer>
  );
}; 