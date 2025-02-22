import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NotificationItem = styled.div<{ isRead?: boolean; empty?: boolean }>`
  display: flex;
  gap: 12px;
  padding: 16px;
  cursor: ${({ empty }) => empty ? 'default' : 'pointer'};
  background: ${({ isRead, empty, theme }) => 
    empty ? 'transparent' : isRead ? 'transparent' : theme.colors.backgroundAlt};

  &:hover {
    background: ${({ empty, theme }) => 
      empty ? 'transparent' : theme.colors.backgroundAlt};
  }
`;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

export const Message = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const Time = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #007bff;
  margin-right: 8px;
  margin-top: 6px;
`;

export const NotificationIcon = styled.div`
  margin-right: 12px;
  color: #666;
`; 