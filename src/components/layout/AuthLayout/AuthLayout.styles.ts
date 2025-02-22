import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const AuthContent = styled.main`
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`; 