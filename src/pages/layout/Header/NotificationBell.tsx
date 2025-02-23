import React from 'react';
import styled from 'styled-components';
import { BellIcon } from '../../../components/common/Icons';

const BellContainer = styled.button`
  position: relative;
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  min-width: 18px;
`;

interface NotificationBellProps {
  count: number;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ count }) => {
  return (
    <BellContainer>
      <BellIcon size={20} />
      {count > 0 && <Badge>{count}</Badge>}
    </BellContainer>
  );
}; 