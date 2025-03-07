import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.background};
`;

export const TextArea = styled.textarea`
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  resize: none;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const AttachmentButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EmojiButton = styled(AttachmentButton)``; 