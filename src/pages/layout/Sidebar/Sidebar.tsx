import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import {
  SidebarContainer,
  Logo,
  NavSection,
  NavHeader,
  NavItem,
  Badge,
  Divider,
  NavDropdownItem,
  DropdownIcon,
  DropdownContent,
  SubNavItem
} from './Sidebar.styles';
import { Home, Layers, FileText, Users, Package, Grid, BarChart2 } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface Template {
  id: string;
  label: string;
  path: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  templates: Template[];
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  
  // 카테고리 열기/닫기 토글
  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  // 템플릿 카테고리 정의
  const templateCategories: Category[] = [
    {
      id: 'ui',
      label: 'UI 컴포넌트',
      icon: <Grid size={18} />,
      templates: [
        { id: 'buttons', label: '버튼', path: '/ui/buttons' },
        { id: 'cards', label: '카드', path: '/ui/cards' },
        { id: 'forms', label: '폼', path: '/ui/forms' },
        { id: 'tables', label: '테이블', path: '/ui/tables' }
      ]
    },
    {
      id: 'users',
      label: '사용자 관리',
      icon: <Users size={18} />,
      templates: [
        { id: 'list', label: '사용자 목록', path: '/users/list' },
        { id: 'create', label: '사용자 추가', path: '/users/create' },
        { id: 'profile', label: '프로필', path: '/users/profile' }
      ]
    },
    {
      id: 'apps',
      label: '애플리케이션',
      icon: <Package size={18} />,
      templates: [
        { id: 'calendar', label: '캘린더', path: '/apps/calendar' },
        { id: 'messenger', label: '메신저', path: '/apps/messenger' },
        { id: 'ecommerce', label: '쇼핑몰', path: '/apps/ecommerce' }
      ]
    },
    {
      id: 'charts',
      label: '차트 & 통계',
      icon: <BarChart2 size={18} />,
      templates: [
        { id: 'line', label: '라인 차트', path: '/charts/line' },
        { id: 'bar', label: '바 차트', path: '/charts/bar' },
        { id: 'pie', label: '파이 차트', path: '/charts/pie' }
      ]
    }
  ];
  
  return (
    <SidebarContainer $isOpen={isSidebarOpen}>
      <Logo onClick={() => navigate('/')}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill={isDarkMode ? "#3a85ff" : "#0066ff"} />
          <path d="M9 14.5C9 12.567 10.567 11 12.5 11H15.5C17.433 11 19 12.567 19 14.5V14.5C19 16.433 17.433 18 15.5 18H12.5C10.567 18 9 16.433 9 14.5V14.5Z" fill="white" />
          <path d="M9 8.5C9 7.11929 10.1193 6 11.5 6H16.5C17.8807 6 19 7.11929 19 8.5V8.5C19 9.88071 17.8807 11 16.5 11H11.5C10.1193 11 9 9.88071 9 8.5V8.5Z" fill={isDarkMode ? "#cfe0ff" : "#e6f0ff"} />
          <path d="M9 20.5C9 19.1193 10.1193 18 11.5 18H16.5C17.8807 18 19 19.1193 19 20.5V20.5C19 21.8807 17.8807 23 16.5 23H11.5C10.1193 23 9 21.8807 9 20.5V20.5Z" fill={isDarkMode ? "#cfe0ff" : "#e6f0ff"} />
        </svg>
        {isSidebarOpen && (
          <div>
            <h1>DevMatch Pro</h1>
            <p>개발자 매칭 플랫폼</p>
          </div>
        )}
      </Logo>

      <Divider />
      
      {/* 메인 네비게이션 */}
        <NavSection>
        {isSidebarOpen && <NavHeader>주요 메뉴</NavHeader>}
        <NavItem to="/dashboard">
          <Home size={18} />
          {isSidebarOpen && <span>대시보드</span>}
          </NavItem>
        <NavItem to="/projects">
          <Layers size={18} />
          {isSidebarOpen && (
            <>
              <span>프로젝트</span>
              <Badge>4</Badge>
            </>
          )}
          </NavItem>
        <NavItem to="/documents">
          <FileText size={18} />
          {isSidebarOpen && <span>문서</span>}
          </NavItem>
        </NavSection>

      <Divider />
      
      {/* 애플리케이션 섹션 */}
      <NavSection>
        {isSidebarOpen && <NavHeader>애플리케이션</NavHeader>}
          {templateCategories.map((category) => (
            <React.Fragment key={category.id}>
              <NavDropdownItem onClick={() => toggleCategory(category.id)}>
              {category.icon}
              {isSidebarOpen && (
                <>
                  <span>{category.label}</span>
                <DropdownIcon $isOpen={openCategories.includes(category.id)}>
                  ›
                </DropdownIcon>
                </>
              )}
              </NavDropdownItem>
            {isSidebarOpen && (
              <DropdownContent $isOpen={openCategories.includes(category.id)}>
                {category.templates.map((template) => (
                  <SubNavItem key={template.id} to={template.path}>
                    {template.label}
                  </SubNavItem>
                ))}
              </DropdownContent>
            )}
            </React.Fragment>
          ))}
      </NavSection>
    </SidebarContainer>
  );
}; 