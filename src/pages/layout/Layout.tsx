import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 24px;
  background: ${({ theme }) => theme.isDarkMode ? '#202634' : '#fff'};
  transition: background-color 0.3s ease;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
}; 