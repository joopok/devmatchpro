import React from 'react';
import { IconType, IconBaseProps } from 'react-icons';
import { 
  FiHome,
  FiPieChart, 
  FiGrid,
  FiMessageSquare,
  FiCalendar,
  FiUsers,
  FiShoppingCart,
  FiFileText,
  FiStar,
  FiSettings,
  FiHelpCircle,
  FiBarChart,
} from 'react-icons/fi';
import { Button } from '../../common/Button';
import { SidebarContainer, Logo, NavItem, Badge, NavSection, NavHeader } from './Sidebar.styles';

interface MenuItem {
  path: string;
  label: string;
  icon: IconType;
  section: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  { path: '/', label: '홈', icon: FiHome, section: 'main' },
  { path: '/dashboard', label: '대시보드', icon: FiPieChart, badge: '5', section: 'main' },
  { path: '/calendar', label: '캘린더', icon: FiCalendar, section: 'apps' },
  { path: '/chat', label: '채팅', icon: FiMessageSquare, section: 'apps' },
  { path: '/projects', label: '프로젝트', icon: FiGrid, section: 'apps' },
  { path: '/teams', label: '팀', icon: FiUsers, section: 'apps' },
  { path: '/analytics', label: '분석', icon: FiBarChart, section: 'pages' },
  { path: '/documents', label: '문서', icon: FiFileText, section: 'pages' },
  { path: '/settings', label: '설정', icon: FiSettings, section: 'tools' },
  { path: '/help', label: '도움말', icon: FiHelpCircle, section: 'tools' },
  { path: '/orders', label: '주문', icon: FiShoppingCart,section: 'tools'  },
  { path: '/favorites', label: '즐겨찾기', icon: FiStar,section: 'tools'  }
];

export const Sidebar = () => {
  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon as React.ComponentType<IconBaseProps>;
    return (
      <NavItem to={item.path} key={item.path}>
        <Icon size={18} style={{ marginRight: '12px' }} aria-hidden="true" />
        {item.label}
        {item.badge && <Badge>{item.badge}</Badge>}
      </NavItem>
    );
  };

  const handleClick = () => {
    // Implementation of handleClick function
  };

  return (
    <SidebarContainer>
      <Logo>
        DevMatch Pro
      </Logo>

      <NavSection>
        <NavHeader>Navigation</NavHeader>
        {renderMenuItem(menuItems[0])}
      </NavSection>

      <NavSection>
        <NavHeader>Apps</NavHeader>
        {menuItems.slice(1, 6).map(renderMenuItem)}
      </NavSection>

      <NavSection>
        <NavHeader>Pages</NavHeader>
        {menuItems.slice(6, 8).map(renderMenuItem)}
      </NavSection>

      <NavSection>
        <NavHeader>Tools</NavHeader>
        {menuItems.slice(8).map(renderMenuItem)}
      </NavSection>

      <Button variant="outline" onClick={handleClick}>
        클릭하기
      </Button>
    </SidebarContainer>
  );
}; 