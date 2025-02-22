import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const MessageItem = styled.div<{ isOwn: boolean }>`
  display: flex;
  justify-content: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
  margin-bottom: 16px;
`;

export const MessageContent = styled.div<{ isOwn: boolean }>`
  background: ${({ isOwn, theme }) =>
    isOwn ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ isOwn, theme }) =>
    isOwn ? theme.colors.white : theme.colors.text};
  padding: 12px 16px;
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

export const InputContainer = styled.form`
  display: flex;
  gap: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`; 