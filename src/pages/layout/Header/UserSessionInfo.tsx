import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../hooks/useAuth';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../store/slices/userSlice';
import { toggleTheme } from '../../../store/slices/themeSlice';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { User, Settings, PieChart, HelpCircle, LogOut, Moon, Sun } from 'lucide-react';

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  border: 2px solid ${({ theme }) => theme.isDarkMode ? '#3a4052' : '#f5f7fb'};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  color: ${({ theme }) => theme.isDarkMode ? '#adb5bd' : 'var(--bs-secondary, #6c757d)'};
`;

// 모바일 아이콘 컨테이너
const MobileIconContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.isDarkMode ? '#adb5bd' : 'var(--bs-secondary, #6c757d)'};
  padding: 0.5rem;
  border-radius: 50%;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.isDarkMode ? '#384056' : '#f8f9fa'};
    color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
  }
`;

// 데스크탑 컨테이너
const DesktopContainer = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  gap: 0.5rem;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.isDarkMode ? '#384056' : '#f8f9fa'};
  }

  span {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.isDarkMode ? '0 0 0 2px #293041' : '0 0 0 2px #fff'};
`;

// 로컬 스토리지 키 정의
const STORAGE_KEYS = {
  TOKEN: 'devmatch_token',
  USER: 'devmatch_user'
};

interface UserSessionInfoProps {
  className?: string;
  hasNotification?: boolean;
}

export const UserSessionInfo: React.FC<UserSessionInfoProps> = memo(({ className, hasNotification }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }, [anchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(clearUser()); // 리덕스 상태 초기화
    localStorage.removeItem(STORAGE_KEYS.TOKEN); // 로컬스토리지 삭제
    localStorage.removeItem(STORAGE_KEYS.USER);
    delete axios.defaults.headers.common['Authorization']; // Axios 헤더 초기화
    window.location.href = '/auth/login';
  }, [dispatch]);

  const handleToggleDarkMode = useCallback(() => {
    dispatch(toggleTheme());
    handleClose();
  }, [dispatch, handleClose]);

  // 사용자가 없는 경우 렌더링하지 않음
  if (!user) return null;

  return (
    <>
      {/* 모바일 버전 */}
      <MobileIconContainer className="nav-icon dropdown-toggle d-inline-block d-sm-none" onClick={handleClick}>
        <Settings size={20} />
        {hasNotification && <Badge>!</Badge>}
      </MobileIconContainer>

      {/* 데스크탑 버전 */}
      <DesktopContainer className="nav-link dropdown-toggle d-none d-sm-inline-block" onClick={handleClick}>
        <Avatar 
          src={user?.avatar || '/assets/img/avatars/avatar.jpg'} 
          alt={user?.username || '사용자'} 
          className="me-1 mt-n2 mb-n2"
        />
        <span>{user?.username || '사용자'}</span>
        {hasNotification && <Badge>!</Badge>}
      </DesktopContainer>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '220px',
            backgroundColor: isDarkMode ? '#293041' : '#fff',
            color: isDarkMode ? '#f8f9fa' : '#212529',
            borderRadius: '8px',
            marginTop: '0.5rem',
            boxShadow: isDarkMode 
              ? '0 0.5rem 1rem rgba(0, 0, 0, 0.4)' 
              : '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          onClick={handleClose}
          style={{ 
            color: isDarkMode ? '#f8f9fa' : '#212529',
            gap: '8px',
            borderBottom: `1px solid ${isDarkMode ? '#3a4052' : '#f5f7fb'}`
          }}
        >
          <IconContainer><User size={16} /></IconContainer>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 600 }}>{user?.username || '사용자'}</div>
            <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#adb5bd' : '#6c757d' }}>{user?.email || ''}</div>
          </div>
        </MenuItem>

        <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#f8f9fa' : '#212529', gap: '8px' }}>
          <IconContainer><User size={16} /></IconContainer>
          프로필
        </MenuItem>

        <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#f8f9fa' : '#212529', gap: '8px' }}>
          <IconContainer><Settings size={16} /></IconContainer>
          계정 설정
        </MenuItem>

        <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#f8f9fa' : '#212529', gap: '8px' }}>
          <IconContainer><PieChart size={16} /></IconContainer>
          분석
        </MenuItem>

        <MenuItem onClick={handleToggleDarkMode} style={{ color: isDarkMode ? '#f8f9fa' : '#212529', gap: '8px' }}>
          <IconContainer>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </IconContainer>
          {isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        </MenuItem>

        <MenuItem onClick={handleClose} style={{ color: isDarkMode ? '#f8f9fa' : '#212529', gap: '8px' }}>
          <IconContainer><HelpCircle size={16} /></IconContainer>
          도움말
        </MenuItem>

        <MenuItem 
          onClick={handleLogout} 
          style={{ 
            color: isDarkMode ? '#e74c3c' : '#dc3545',
            gap: '8px',
            borderTop: `1px solid ${isDarkMode ? '#3a4052' : '#f5f7fb'}`
          }}
        >
          <IconContainer style={{ color: isDarkMode ? '#e74c3c' : '#dc3545' }}>
            <LogOut size={16} />
          </IconContainer>
          로그아웃
        </MenuItem>
      </Menu>
    </>
  );
}); 