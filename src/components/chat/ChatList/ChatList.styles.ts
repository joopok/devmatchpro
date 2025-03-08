import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatItem = styled.div<{ hasUnread: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  background: ${({ hasUnread, theme }) =>
    hasUnread ? theme.colors.backgroundAlt : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

export const LastMessage = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MessageTime = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const UnreadBadge = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`; 