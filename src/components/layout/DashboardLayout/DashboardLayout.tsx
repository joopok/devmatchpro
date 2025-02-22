import React from 'react';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { DashboardContainer, Content } from './DashboardLayout.styles';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <DashboardContainer>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
      <Content>
          {children}
        </Content>
      </div>
    </DashboardContainer>
  );
}; 