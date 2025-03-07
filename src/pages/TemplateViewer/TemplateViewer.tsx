import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ViewerContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const BackButton = styled.button`
  margin: 10px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const TemplateListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
`;

const TemplateCard = styled.div`
  background-color: ${({ theme }) => theme.isDarkMode ? theme.colors.backgroundDark : 'white'};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const TemplateTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

const TemplateDescription = styled.p`
  color: ${({ theme }) => theme.isDarkMode ? '#aaa' : '#666'};
  font-size: 14px;
  margin: 0;
`;

const SearchBar = styled.div`
  margin: 20px 20px 0;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? '#3a4358' : '#e0e0e0'};
  background-color: ${({ theme }) => theme.isDarkMode ? '#293042' : 'white'};
  color: ${({ theme }) => theme.isDarkMode ? 'white' : 'black'};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}30`};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.isDarkMode ? '#aaa' : '#666'};
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 20px 20px 0;
`;

const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.isDarkMode ? '#3a4358' : '#e0e0e0'};
  background-color: ${({ theme, isActive }) => isActive ? `${theme.colors.primary}20` : 'transparent'};
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.isDarkMode ? '#aaa' : '#666'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme, isActive }) => isActive ? `${theme.colors.primary}30` : theme.isDarkMode ? '#3a435820' : '#f0f0f0'};
  }
`;

const TemplatePreview = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? '#3a4358' : '#e0e0e0'};
`;

const TemplateBadge = styled.span`
  font-size: 12px;
  padding: 2px 6px;
  background-color: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  margin-top: 8px;
  display: inline-block;
`;

interface Template {
  id: string;
  title: string;
  path: string;
  description: string;
  category: string;
  imagePath?: string;
  tags?: string[];
}

const templates: Template[] = [
  { 
    id: 'dashboard-default', 
    title: '기본 대시보드', 
    path: '/docs/dashboard-default.html', 
    description: '기본 대시보드 템플릿', 
    category: '대시보드',
    imagePath: '/docs/img/screenshots/dashboard-default.jpg',
    tags: ['차트', '위젯', '통계']
  },
  { 
    id: 'dashboard-analytics', 
    title: '분석 대시보드', 
    path: '/docs/dashboard-analytics.html', 
    description: '데이터 분석용 대시보드', 
    category: '대시보드',
    imagePath: '/docs/img/screenshots/dashboard-analytics.jpg',
    tags: ['분석', '차트', '통계']
  },
  { 
    id: 'projects-overview', 
    title: '프로젝트 개요', 
    path: '/docs/projects-overview.html', 
    description: '프로젝트 관리 개요 페이지', 
    category: '프로젝트',
    imagePath: '/docs/img/screenshots/projects-overview.jpg',
    tags: ['프로젝트', '관리', '개요']
  },
  { 
    id: 'projects-details', 
    title: '프로젝트 상세', 
    path: '/docs/projects-details.html', 
    description: '프로젝트 상세 정보 페이지', 
    category: '프로젝트',
    imagePath: '/docs/img/screenshots/projects-details.jpg',
    tags: ['프로젝트', '상세', '작업']
  },
  { 
    id: 'calendar', 
    title: '캘린더', 
    path: '/docs/calendar.html', 
    description: '이벤트 캘린더 페이지', 
    category: '애플리케이션',
    imagePath: '/docs/img/screenshots/calendar.jpg',
    tags: ['일정', '이벤트', '캘린더']
  },
  { 
    id: 'tasks-kanban', 
    title: '칸반 보드', 
    path: '/docs/tasks-kanban.html', 
    description: '칸반 스타일 작업 관리', 
    category: '작업',
    imagePath: '/docs/img/screenshots/tasks-kanban.jpg',
    tags: ['작업', '칸반', '드래그앤드롭']
  },
  { 
    id: 'tasks-list', 
    title: '작업 목록', 
    path: '/docs/tasks-list.html', 
    description: '작업 목록 관리', 
    category: '작업',
    imagePath: '/docs/img/screenshots/tasks-list.jpg',
    tags: ['작업', '리스트', '할일']
  },
  { 
    id: 'chat', 
    title: '채팅', 
    path: '/docs/chat.html', 
    description: '메시징 인터페이스', 
    category: '통신',
    imagePath: '/docs/img/screenshots/chat.jpg',
    tags: ['채팅', '메시지', '대화']
  },
  { 
    id: 'auth-sign-in', 
    title: '로그인', 
    path: '/docs/auth-sign-in.html', 
    description: '사용자 로그인 페이지', 
    category: '인증',
    imagePath: '/docs/img/screenshots/auth-sign-in.jpg',
    tags: ['인증', '로그인', '사용자']
  },
  { 
    id: 'auth-sign-up', 
    title: '회원가입', 
    path: '/docs/auth-sign-up.html', 
    description: '사용자 회원가입 페이지', 
    category: '인증',
    imagePath: '/docs/img/screenshots/auth-sign-up.jpg',
    tags: ['인증', '회원가입', '사용자']
  },
  { 
    id: 'forms-basic-inputs', 
    title: '기본 입력 폼', 
    path: '/docs/forms-basic-inputs.html', 
    description: '기본 입력 요소', 
    category: '폼',
    imagePath: '/docs/img/screenshots/forms-basic-inputs.jpg',
    tags: ['폼', '입력', 'UI']
  },
  { 
    id: 'forms-advanced-inputs', 
    title: '고급 입력 폼', 
    path: '/docs/forms-advanced-inputs.html', 
    description: '고급 입력 요소', 
    category: '폼',
    imagePath: '/docs/img/screenshots/forms-advanced-inputs.jpg',
    tags: ['폼', '고급입력', 'UI']
  },
  { 
    id: 'ui-buttons', 
    title: '버튼', 
    path: '/docs/ui-buttons.html', 
    description: '다양한 버튼 스타일', 
    category: 'UI 요소',
    imagePath: '/docs/img/screenshots/ui-buttons.jpg',
    tags: ['UI', '버튼', '컴포넌트']
  },
  { 
    id: 'ui-cards', 
    title: '카드', 
    path: '/docs/ui-cards.html', 
    description: '카드 컴포넌트', 
    category: 'UI 요소',
    imagePath: '/docs/img/screenshots/ui-cards.jpg',
    tags: ['UI', '카드', '컴포넌트']
  },
  { 
    id: 'charts-chartjs', 
    title: 'Chart.js', 
    path: '/docs/charts-chartjs.html', 
    description: 'Chart.js 기반 차트', 
    category: '차트',
    imagePath: '/docs/img/screenshots/charts-chartjs.jpg',
    tags: ['차트', '데이터', '시각화']
  },
  { 
    id: 'charts-apexcharts', 
    title: 'ApexCharts', 
    path: '/docs/charts-apexcharts.html', 
    description: 'ApexCharts 기반 차트', 
    category: '차트',
    imagePath: '/docs/img/screenshots/charts-apexcharts.jpg',
    tags: ['차트', '데이터', '시각화']
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'in_progress' | 'pending' | 'completed';
}

// interface CalendarViewProps {
//   date: Date;
//   events: any[];
// }

const TemplateViewer: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === templateId);
      setSelectedTemplate(template || null);
    } else {
      setSelectedTemplate(null);
    }
  }, [templateId]);

  const handleGoBack = () => {
    navigate('/templates');
  };

  const handleSelectTemplate = (template: Template) => {
    navigate(`/templates/${template.id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (template.tags && template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === '전체' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['전체', ...Array.from(new Set(templates.map(t => t.category)))];

  if (selectedTemplate) {
    return (
      <ViewerContainer>
        <BackButton onClick={handleGoBack}>← 템플릿 목록으로 돌아가기</BackButton>
        <StyledIframe src={selectedTemplate.path} title={selectedTemplate.title} />
      </ViewerContainer>
    );
  }

  return (
    <div>
      <h1 style={{ padding: '20px 20px 0' }}>템플릿 갤러리</h1>
      <p style={{ padding: '0 20px 20px' }}>아래의 템플릿 중 하나를 선택하여 확인해보세요.</p>
      
      <SearchBar>
        <SearchInput 
          type="text" 
          placeholder="템플릿 검색..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <SearchIcon role="button" onClick={clearSearch}>✕</SearchIcon>
        )}
      </SearchBar>
      
      <CategoryFilter>
        {categories.map(category => (
          <CategoryButton 
            key={category}
            isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>
      
      <div style={{ padding: '10px 20px' }}>
        <span>{filteredTemplates.length}개의 템플릿</span>
      </div>
      
      <TemplateListContainer>
        {filteredTemplates.map(template => (
          <TemplateCard key={template.id} onClick={() => handleSelectTemplate(template)}>
            {template.imagePath && (
              <TemplatePreview src={template.imagePath} alt={template.title} />
            )}
            <TemplateTitle>{template.title}</TemplateTitle>
            <TemplateDescription>{template.description}</TemplateDescription>
            {template.tags && (
              <div style={{ marginTop: '10px' }}>
                {template.tags.map(tag => (
                  <TemplateBadge key={tag}>{tag}</TemplateBadge>
                ))}
              </div>
            )}
          </TemplateCard>
        ))}
      </TemplateListContainer>

      {filteredTemplates.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
          <h3>검색 결과가 없습니다</h3>
          <p>다른 검색어를 입력하거나 필터를 변경해보세요.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('전체');
            }}
            style={{
              padding: '8px 16px',
              background: '#4361ee',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateViewer; 