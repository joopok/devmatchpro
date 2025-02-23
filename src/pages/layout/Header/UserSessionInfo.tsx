import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../hooks/useAuth';
import { Menu, MenuItem } from '@mui/material';

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
`;

const UserRole = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const UserSessionInfo: React.FC = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <UserContainer onClick={handleClick}>
        <Avatar src={user?.avatar || '/assets/img/avatars/avatar.jpg'} alt={user?.username} />
        <UserInfo>
          <UserName>{user?.username}</UserName>
          <UserRole>{user?.role}</UserRole>
        </UserInfo>
      </UserContainer>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>프로필</MenuItem>
        <MenuItem onClick={handleClose}>설정</MenuItem>
        <MenuItem onClick={handleClose}>로그아웃</MenuItem>
      </Menu>
    </>
  );
}; 