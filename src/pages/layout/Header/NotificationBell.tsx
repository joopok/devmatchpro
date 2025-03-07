import React from 'react';
import styled from 'styled-components';
import { Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const BellContainer = styled.button`
  position: relative;
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.isDarkMode ? '#adb5bd' : '#6c757d'};
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.isDarkMode ? '#384056' : '#f8f9fa'};
    color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  font-size: 0.625rem;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.isDarkMode ? '0 0 0 2px #293041' : '0 0 0 2px #fff'};
`;

interface NotificationBellProps {
  count: number;
  onClick?: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ count, onClick }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  
  return (
    <BellContainer onClick={onClick} aria-label={`알림 ${count}개`}>
      <Bell size={20} />
      {count > 0 && <Badge>{count > 99 ? '99+' : count}</Badge>}
    </BellContainer>
  );
}; 