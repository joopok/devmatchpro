import React from 'react';
import styled from 'styled-components';
import { useProjectStats } from '../../../../hooks/useProjectStats';
import { BarChart, LineChart, PieChart } from '../../../common/Charts';
import { Card, CardHeader, CardContent } from '@mui/material';
import { Project } from '../../../../types/project';

interface ProjectMetricsProps {
  projects: Project[];
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ projects }) => {
  const { data: projectStats } = useProjectStats();

  const chartData = {
    labels: projectStats?.monthlyTrends.map(item => item.month) || [],
    datasets: [
      {
        label: '완료된 프로젝트',
        data: projectStats?.monthlyTrends.map(item => item.completed) || [],
        color: '#2196F3',
      }
    ]
  };

  return (
    <MetricsContainer>
      <Card>
        <CardHeader>
          <h3>프로젝트 상태 분포</h3>
        </CardHeader>
        <CardContent>
          <PieChart
            data={projectStats?.statusDistribution.map(item => ({
              name: item.status,
              value: item.count,
            })) || []}
            height={300}
          >
            {/* 차트 내용 */}
          </PieChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3>월별 프로젝트 추이</h3>
        </CardHeader>
        <CardContent>
          <LineChart data={chartData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3>부서별 예산 현황</h3>
        </CardHeader>
        <CardContent>
          <BarChart
            data={projectStats?.departmentBudgets.map(item => ({
              name: item.department,
              value: item.budget,
            })) || []}
            xAxisKey="name"
            yAxisKey="value"
            height={300}
          />
        </CardContent>
      </Card>
    </MetricsContainer>
  );
};

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`; 