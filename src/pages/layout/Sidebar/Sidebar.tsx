import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  HomeIcon, ChartIcon, UsersIcon, ProjectIcon, 
  SettingsIcon, DocumentIcon, CalendarIcon 
} from '../../../components/common/Icons';

const SidebarContainer = styled.aside`
  width: 280px;
  height: 100vh;
  background: ${({ theme }) => theme.isDarkMode ? '#293042' : '#fff'};
  border-right: 1px solid ${({ theme }) => 
    theme.isDarkMode ? '#202634' : theme.colors.border};
  padding: 24px 0;
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: translateX(-100%);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.isDarkMode ? '#3a4358' : theme.colors.border};
    border-radius: 3px;
  }
`;

const Logo = styled.div`
  padding: 0 24px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.isDarkMode ? theme.colors.sidebarText : theme.colors.text};
  margin: 0;
`;

const NavGroup = styled.div`
  margin-bottom: 24px;
  padding-right: 8px;
`;

const NavLabel = styled.div`
  padding: 12px 24px;
  font-size: 11px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.isDarkMode ? theme.colors.textSecondary : theme.colors.text};
  letter-spacing: 0.5px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: ${({ theme }) => theme.isDarkMode ? theme.colors.sidebarText : theme.colors.text};
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
  { path: '/calendar', label: '캘린더122', icon: CalendarIcon },
  { path: '/documents', label: '문서', icon: DocumentIcon },
  { path: '/settings', label: '설정', icon: SettingsIcon },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <Logo onClick={() => navigate('/')}>
        <img src="/assets/img/logo.svg" alt="Logo" height="32" />
        <LogoText>Devmatch Pro</LogoText>
      </Logo>

      <NavGroup>
        <NavLabel>
        </NavLabel>
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