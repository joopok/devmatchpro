import styled from 'styled-components';

export const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const MessageGroup = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  flex-direction: ${({ isCurrentUser }) => isCurrentUser ? 'row-reverse' : 'row'};
  gap: 8px;
  margin-bottom: 16px;
`;

export const MessageBubble = styled.div<{ isCurrentUser: boolean }>`
  background: ${({ isCurrentUser, theme }) =>
    isCurrentUser ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ isCurrentUser, theme }) =>
    isCurrentUser ? theme.colors.white : theme.colors.text};
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 70%;
  position: relative;
`;

export const MessageTime = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
  display: block;
`;

export const DateDivider = styled.div`
  text-align: center;
  margin: 24px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  
  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 100px;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    margin: 0 12px;
    vertical-align: middle;
  }
`; 