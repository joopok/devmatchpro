import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Footer } from '../Footer/Footer';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.isDarkMode ? '#1e2232' : '#fff'};
`;

const MainWrapper = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '280px' : '0')};
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: margin-left 0.3s ease-in-out;
  background: ${({ theme }) => theme.isDarkMode ? '#1e2232' : '#fff'};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: -1rem;
  background: ${({ theme }) => theme.isDarkMode ? '#1e2232' : '#fff'};

  min-height: calc(100vh - 200px);
  transition: width 0.3s ease-in-out;
  
  > * {
    width: 100%;
    margin: 0 auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem;
  }
`;

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <LayoutContainer>
      <MainWrapper isSidebarOpen= { isSidebarOpen } >
        <Sidebar />
        <Header />
        <MainContent>
          {children || <Outlet />}
        </MainContent>
        <Footer />
      </MainWrapper>
    </LayoutContainer>
  );
}; 