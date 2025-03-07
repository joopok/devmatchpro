import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TaskBoard } from '../../components/common/dashboard/TaskBoard/TaskBoard';
import { ProjectMetrics } from '../../components/common/dashboard/ProjectMetrics/ProjectMetrics';
import { RevenueAnalytics } from '../../components/common/analytics/RevenueAnalytics/RevenueAnalytics';
import { Task } from '../../types/task';
import { Project, ProjectStatus, WorkType, Priority } from '../../types/project';

const dummyTasks: Task[] = [
  {
    id: '1',
    title: '기획서 작성',
    description: '프로젝트 기획서 초안 작성',
    status: '대기중',
    priority: 'HIGH',
    dueDate: '2024-04-01',
  },
  {
    id: '2',
    title: '디자인 시안',
    description: '메인 페이지 디자인',
    status: '진행중',
    priority: 'MEDIUM',
    dueDate: '2024-04-05',
  },
  {
    id: '3',
    title: 'API 개발',
    description: '사용자 인증 API 구현',
    status: '진행중',
    priority: 'HIGH',
    dueDate: '2024-04-10',
  },
  {
    id: '4',
    title: '환경 설정',
    description: '개발 환경 구성',
    status: '완료',
    priority: 'LOW',
    dueDate: '2024-03-30',
  },
];

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h1 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const RefreshButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const FilterButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BoardSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const AnalyticsSection = styled(BoardSection)``;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  padding: 4px;
`;

const ViewOption = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) =>
    active ? 'white' : theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.backgroundHover};
  }
`;

const PeriodSelector = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 2rem;
`;

interface ProjectFromStore {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  workType?: string;
  location?: string;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  duration?: {
    start: string;
    end?: string;
  };
  requiredSkills?: string[];
  teamSize?: number;
}

const Dashboard: React.FC = () => {
  const { projects: projectsFromStore, isLoading, error } = useSelector((state: RootState) => state.project);

  const projects: Project[] = (projectsFromStore as ProjectFromStore[]).map(p => {
    const project: Project = {
      id: p.id || '',
      title: p.title || '',
      description: p.description || '',
      status: (p.status as ProjectStatus) || 'PLANNING',
      priority: (p.priority as Priority) || 'MEDIUM',
      duration: {
        start: p.duration?.start || new Date().toISOString(),
        end: p.duration?.end
      },
      budget: {
        min: p.budget?.min || 0,
        max: p.budget?.max || 0,
        currency: p.budget?.currency || 'KRW'
      },
      workType: (p.workType as WorkType) || 'REMOTE',
      location: p.location,
      requiredSkills: p.requiredSkills || [],
      teamSize: p.teamSize || 1,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return project;
  });

  const handleTaskMove = (taskId: string, sourceId: string, destinationId: string) => {
    console.log('Task moved:', { taskId, sourceId, destinationId });
  };

  const handleAddTask = (columnId: string) => {
    console.log('Add task to column:', columnId);
  };

  const dummyRevenueMetrics = {
    totalRevenue: 1000000,
    averageProjectValue: 500000,
    activeProjects: 5,
    growthRate: 15,
    monthlyData: [
      {
        month: '1월',
        revenue: 800000,
        expenses: 6000000,
        profit: 200000,
      },
      {
        month: '2월',
        revenue: 900000,
        expenses: 650000,
        profit: 250000,
      },
      {
        month: '3월',
        revenue: 1000000,
        expenses: 700000,
        profit: 300000,
      },
    ],
    revenueByCategory: [
      {
        category: '웹 개발',
        amount: 500000,
        growth: 0.2,
      },
      {
        category: '모바일 앱',
        amount: 300000,
        growth: 0.15,
      },
      {
        category: '컨설팅',
        amount: 200000,
        growth: 0.1,
      },
    ],
  };

  if (isLoading) {
    return <LoadingSpinner>로딩 중...</LoadingSpinner>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>대시보드</h1>
        <HeaderActions>
          <RefreshButton>새로고침</RefreshButton>
          <FilterButton>필터</FilterButton>
        </HeaderActions>
      </DashboardHeader>

      <MetricsGrid>
        <ProjectMetrics projects={projects} />
      </MetricsGrid>

      <BoardSection>
        <SectionHeader>
          <h2>작업 현황</h2>
          <ViewToggle>
            <ViewOption active>보드</ViewOption>
            <ViewOption>리스트</ViewOption>
          </ViewToggle>
        </SectionHeader>
        <TaskBoard
          columns={[
            {
              id: 'todo',
              title: '할 일',
              tasks: dummyTasks.filter(task => task.status === '대기중'),
            },
            {
              id: 'in-progress',
              title: '진행중',
              tasks: dummyTasks.filter(task => task.status === '진행중'),
            },
            {
              id: 'done',
              title: '완료',
              tasks: dummyTasks.filter(task => task.status === '완료'),
            },
          ]}
          onTaskMove={handleTaskMove}
          onAddTask={handleAddTask}
        />
      </BoardSection>

      <AnalyticsSection>
        <SectionHeader>
          <h2>프로젝트 분석</h2>
          <PeriodSelector>
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
            <option value="quarter">이번 분기</option>
          </PeriodSelector>
        </SectionHeader>
        <RevenueAnalytics 
          metrics={dummyRevenueMetrics}
          period="month"
          onPeriodChange={(period) => console.log('Period changed:', period)}
        />
      </AnalyticsSection>
    </DashboardContainer>
  );
};

export default Dashboard; 