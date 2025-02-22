import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  background-color: #f5f5f5;
`;

export const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </LayoutContainer>
  );
}; 