import React, { useCallback, useState } from 'react';
import { UserSessionInfo } from './UserSessionInfo';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../store/slices/sidebarSlice';
import { RootState } from '../../../store/store';
import styled from 'styled-components';
import { MessageCircle, Bell, Menu as MenuIcon } from 'lucide-react';
import { HeaderContainer, LeftSection, RightSection, IconButton, SidebarToggle } from './Header.styles';
import { CollapseButton } from '../Sidebar/Sidebar.styles';

// 스타일 컴포넌트
const NotificationBadge = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bs-danger, #dc3545);
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.isDarkMode ? '0 0 0 2px #293041' : '0 0 0 2px #fff'};
`;

interface HeaderProps {
  onClose?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const [messagesAnchorEl, setMessagesAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  
  // 사이드바 토글
  const handleSidebarToggle = useCallback(() => {
    // 토글 액션 디스패치
    dispatch(toggleSidebar());
    
    // 콜백 호출 (필요한 경우)
    if (onClose && !isSidebarOpen) {
      // 약간의 지연을 두어 애니메이션이 완료된 후 콜백이 실행되도록 함
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }, [dispatch, onClose, isSidebarOpen]);

  const handleMessagesToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMessagesAnchorEl(messagesAnchorEl ? null : event.currentTarget);
  };

  const handleMessagesClose = () => {
    setMessagesAnchorEl(null);
  };

  const handleNotificationsToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotificationsAnchorEl(notificationsAnchorEl ? null : event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  return (
    <HeaderContainer $isSidebarOpen={isSidebarOpen}>
      <SidebarToggle>
        <CollapseButton onClick={handleSidebarToggle}>
          <MenuIcon size={22} />
        </CollapseButton>
      </SidebarToggle>
      
      <LeftSection style={{ marginLeft: '-5px' }}>
        <SearchBar 
          placeholder="검색어를 입력하세요..."
          onSearch={(query) => console.log('Search:', query)}
        />
      </LeftSection>
      
      <RightSection>
        <IconButton onClick={handleMessagesToggle}>
          <MessageCircle size={20} />
          <NotificationBadge>8</NotificationBadge>
        </IconButton>
        
        <Menu
          anchorEl={messagesAnchorEl}
          open={Boolean(messagesAnchorEl)}
          onClose={handleMessagesClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            style: {
              backgroundColor: isDarkMode ? '#2d3348' : '#fff',
              color: isDarkMode ? '#f8f9fa' : '#212529',
              borderRadius: '8px',
              minWidth: '320px'
            }
          }}
        >
          <MenuItem onClick={handleMessagesClose}>메시지 1</MenuItem>
          <MenuItem onClick={handleMessagesClose}>메시지 2</MenuItem>
        </Menu>
        
        <IconButton onClick={handleNotificationsToggle}>
          <Bell size={20} />
          <NotificationBadge>5</NotificationBadge>
        </IconButton>
        
        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleNotificationsClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            style: {
              backgroundColor: isDarkMode ? '#2d3348' : '#fff',
              color: isDarkMode ? '#f8f9fa' : '#212529',
              borderRadius: '8px',
              minWidth: '320px'
            }
          }}
        >
          <MenuItem onClick={handleNotificationsClose}>알림 1</MenuItem>
          <MenuItem onClick={handleNotificationsClose}>알림 2</MenuItem>
        </Menu>
        
        <ThemeToggle />
        <UserSessionInfo />
      </RightSection>
    </HeaderContainer>
  );
};