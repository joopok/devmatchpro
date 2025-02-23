import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { 
  HomeIcon, ChartIcon, UsersIcon, ProjectIcon, 
  SettingsIcon, DocumentIcon, CalendarIcon 
} from '../../common/Icons';

const SidebarContainer = styled.aside`
  width: 280px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.sidebar};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 24px 0;
`;

const Logo = styled.div`
  padding: 0 24px 24px;
  img {
    height: 32px;
  }
`;

const NavGroup = styled.div`
  margin-bottom: 24px;
`;

const NavLabel = styled.div`
  padding: 12px 24px;
  font-size: 11px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.5px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: ${({ theme }) => theme.colors.sidebarText};
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }
  
  svg {
    margin-right: 12px;
  }
`;

const navItems = [
  { path: '/', label: '대시보드', icon: HomeIcon },
  { path: '/analytics', label: '분석', icon: ChartIcon },
  { path: '/projects', label: '프로젝트', icon: ProjectIcon },
  { path: '/users', label: '사용자', icon: UsersIcon },
  { path: '/calendar', label: '캘린더', icon: CalendarIcon },
  { path: '/documents', label: '문서', icon: DocumentIcon },
  { path: '/settings', label: '설정', icon: SettingsIcon },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Logo>
        <img src="/assets/img/logo.svg" alt="Logo" />
      </Logo>

      <NavGroup>
        <NavLabel>메뉴</NavLabel>
        {navItems.map((item) => (
          <NavItem 
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <item.icon size={20} />
            {item.label}
          </NavItem>
        ))}
      </NavGroup>
    </SidebarContainer>
  );
}; 