import styled from 'styled-components';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
`; 