import React from 'react';
import styled from 'styled-components';
import { LineChart, BarChart, PieChart } from '../components/common/Charts';
import { Card } from '../components/common/Card';
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// 스타일 컴포넌트
const DashboardContainer = styled.div`
  padding: 24px;
`;

const WelcomeSection = styled.div`
  background: ${({ theme }) => theme.colors.primary}10;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`;

interface Project {
  id: number;
  name: string;
  company: string;
  author: string;
  status: string;
}

interface ProjectItemProps {
  project: Project;
}

const ProjectItem = styled.div<ProjectItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ProjectItemComponent: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <ProjectItem project={project}>
      <div>
        <h4>{project.name}</h4>
        <p>{project.company}</p>
      </div>
      <div>
        <span>{project.author}</span>
        <span>{project.status}</span>
      </div>
    </ProjectItem>
  );
};

const Home: React.FC = () => {
  const { user } = useAuth();
  
  // 매출 데이터
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '매출',
        data: [30000, 35000, 25000, 45000, 40000, 50000, 35000, 45000, 40000, 50000, 45000, 60000],
        borderColor: '#0066ff',
        backgroundColor: '#0066ff20',
      }
    ]
  };

  // 주간 매출 분포
  const weeklyData = {
    labels: ['Direct', 'Affiliate', 'E-mail', 'Other'],
    datasets: [{
      data: [4000, 3000, 2000, 1000],
      backgroundColor: ['#0066ff', '#ff4405', '#ffd600', '#00b884']
    }]
  };

  return (
    <DashboardContainer>
      <WelcomeSection>
        <div>
          <h2>환영합니다, {user?.username}님!</h2>
          <p>오늘도 좋은 하루 되세요.</p>
        </div>
        <div>
          <h3>$ 24,300</h3>
          <p>총 매출</p>
        </div>
      </WelcomeSection>

      <StatsGrid>
        <Card>
          <h4>총 매출</h4>
          <h2>$ 24,300</h2>
          <p>전월 대비 +15%</p>
        </Card>
        <Card>
          <h4>주문 건수</h4>
          <h2>43</h2>
          <p>이번 주 신규 주문</p>
        </Card>
        <Card>
          <h4>총 수익</h4>
          <h2>$ 18,700</h2>
          <p>순이익</p>
        </Card>
      </StatsGrid>

      <ChartSection>
        <Card>
          <h3>매출 / 수익</h3>
          <LineChart data={revenueData} />
        </Card>
        <Card>
          <h3>주간 매출 분포</h3>
          <PieChart data={weeklyData} />
        </Card>
      </ChartSection>

      <GridSection>
        <Card>
          <h3>캘린더</h3>
          {/* 캘린더 컴포넌트 */}
        </Card>
        <Card>
          <h3>최근 프로젝트</h3>
          <ProjectList />
        </Card>
      </GridSection>
    </DashboardContainer>
  );
};

// ProjectList 컴포넌트 수정
const ProjectList: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      name: 'Project Apollo',
      company: 'Spacex',
      author: 'Chris Jenkins',
      status: 'In Progress'
    },
    // ... 더 많은 프로젝트
  ];

  return (
    <div>
      {projects.map(project => (
        <ProjectItemComponent key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Home; 