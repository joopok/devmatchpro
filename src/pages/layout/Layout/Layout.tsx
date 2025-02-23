import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainWrapper = styled.div`
  flex: 1;
  margin-left: 280px; // 사이드바 너비만큼 여백
  display: flex;
  flex-direction: column;
  min-width: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background: ${({ theme }) => theme.isDarkMode ? '#202634' : '#fff'};
  min-height: calc(100vh - 72px); // 헤더 높이를 뺀 값
  overflow-x: hidden;
`;

export const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </LayoutContainer>
  );
}; 