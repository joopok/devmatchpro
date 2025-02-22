import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: 16px;
  line-height: 1.5;
`;

export const RetryButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`; 