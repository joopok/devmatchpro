import React from 'react';
import styled from 'styled-components';
import { ProjectStatus } from '../../../types/project';

interface StatusBadgeProps {
  status: ProjectStatus;
  children?: React.ReactNode;
}

const Badge = styled.span<{ $status: ProjectStatus }>`
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 12px;
  font-weight: 500;
  
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'OPEN':
        return theme.colors.success + '20';
      case 'COMPLETED':
        return theme.colors.primary + '20';
      case 'IN_PROGRESS':
        return theme.colors.warning + '20';
      case 'CANCELLED':
        return theme.colors.error + '20';
      default:
        return theme.colors.border;
    }
  }};
  
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'OPEN':
        return theme.colors.success;
      case 'COMPLETED':
        return theme.colors.primary;
      case 'IN_PROGRESS':
        return theme.colors.warning;
      case 'CANCELLED':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  }};
`;

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children }) => {
  return (
    <Badge $status={status}>
      {children}
    </Badge>
  );
}; 