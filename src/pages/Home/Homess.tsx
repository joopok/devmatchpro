import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { LineChart, PieChart } from '../../components/common/charts';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import { ProjectStatus } from '../../types/project';

// 라이트 모드와 다크 모드 테마 정의
const lightTheme = {
  colors: {
    primary: '#0066ff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    background: '#ffffff',
    backgroundContent: '#f5f7fb',
    card: '#ffffff',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6',
    hover: '#f8f9fa',
  },
  shadows: {
    card: '0 0.5rem 1rem rgba(0, 0, 0, 0.05)',
    hover: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)',
  },
};

const darkTheme = {
  colors: {
    primary: '#3a85ff',
    secondary: '#adb5bd',
    success: '#2fb344',
    danger: '#e74c3c',
    warning: '#f39c12',
    info: '#3498db',
    background: '#293041',
    backgroundContent: '#1e2231',
    card: '#2d3348',
    text: '#f8f9fa',
    textSecondary: '#adb5bd',
    border: '#3a4052',
    hover: '#384056',
  },
  shadows: {
    card: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
    hover: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.3)',
  },
};

// 테마 관련 훅
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleTheme, theme: isDarkMode ? darkTheme : lightTheme };
};

// 스타일 컴포넌트
const DashboardContainer = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.backgroundContent};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  transition: all 0.3s ease;
`;

const WelcomeSection = styled.div`
  background: ${({ theme }) => `${theme.colors.primary}20`};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.text};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ThemeToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.card};
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

interface Project {
  id: string;
  name: string;
  title: string;
  company: string;
  author: string;
  status: ProjectStatus;
}

interface ProjectItemProps {
  project: Project;
}

const ProjectItem = styled.div<{ status?: ProjectStatus }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const ProjectInfo = styled.div`
  h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
  }
  
  p {
    margin: 4px 0 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  span {
    font-size: 14px;
    &:first-child {
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 4px;
    }
    &:last-child {
      padding: 4px 8px;
      border-radius: 4px;
      background-color: ${({ theme }) => `${theme.colors.success}20`};
      color: ${({ theme }) => theme.colors.success};
    }
  }
`;

const ProjectItemComponent: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <ProjectItem>
      <ProjectInfo>
        <h4>{project.name}</h4>
        <p>{project.company}</p>
      </ProjectInfo>
      <ProjectMeta>
        <span>{project.author}</span>
        <span>{project.status}</span>
      </ProjectMeta>
    </ProjectItem>
  );
};

// 다크 모드 아이콘 컴포넌트
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const Home: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme, theme } = useTheme();
  
  // 매출 데이터
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '매출',
        data: [30000, 35000, 25000, 45000, 40000, 50000, 35000, 45000, 40000, 50000, 45000, 60000],
        borderColor: theme.colors.primary,
        backgroundColor: `${theme.colors.primary}20`,
      }
    ]
  };

  // 주간 매출 분포
  const weeklyData = {
    labels: ['Direct', 'Affiliate', 'E-mail', 'Other'],
    datasets: [{
      label: '매출 경로',
      data: [4000, 3000, 2000, 1000],
      backgroundColor: [theme.colors.primary, theme.colors.danger, theme.colors.warning, theme.colors.success]
    }]
  };

  return (
    <ThemeProvider theme={theme}>
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

        <ThemeToggleButton onClick={toggleTheme}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </ThemeToggleButton>
      </DashboardContainer>
    </ThemeProvider>
  );
};

// ProjectList 컴포넌트 수정
const ProjectList: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      name: 'Project Apollo',
      title: 'Project Apollo',
      company: 'Spacex',
      author: 'Chris Jenkins',
      status: 'IN_PROGRESS'
    },
    {
      id: '2',
      name: 'Project Fireball',
      title: 'Project Fireball',
      company: 'Amazon',
      author: 'Emma Wilson',
      status: 'COMPLETED'
    },
    {
      id: '3',
      name: 'Project Hades',
      title: 'Project Hades',
      company: 'Tesla',
      author: 'Alex Lee',
      status: 'IN_PROGRESS'
    },
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