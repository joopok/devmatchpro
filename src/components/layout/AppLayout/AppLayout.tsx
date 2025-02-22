import React from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import { AppLayoutContainer, MainContent } from './AppLayout.styles';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <AppLayoutContainer>
      <Header />
      <div className="flex">
        <Sidebar />
        <MainContent>
          {children}
        </MainContent>
      </div>
      <Footer />
    </AppLayoutContainer>
  );
}; 