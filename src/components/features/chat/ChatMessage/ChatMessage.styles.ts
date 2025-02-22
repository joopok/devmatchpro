import styled from 'styled-components';

export const MessageContainer = styled.div<{ isOwn: boolean }>`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex-direction: ${({ isOwn }) => isOwn ? 'row-reverse' : 'row'};
  margin-bottom: 16px;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
`;

export const SenderName = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
`;

export const MessageText = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
`;

export const MessageTime = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`; 