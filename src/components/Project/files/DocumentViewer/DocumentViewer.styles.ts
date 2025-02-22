import styled from 'styled-components';

export const ViewerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ZoomControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LoadingMessage = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ErrorMessage = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.error};
`; 