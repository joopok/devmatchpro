import React, { useState } from 'react';
import styled from 'styled-components';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'contained';
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TabList = styled.div<{ $variant?: string }>`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
`;

const TabButton = styled.button<{ $active: boolean; $variant?: string }>`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.text};
  border-bottom: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.primary : 'transparent'};
`;

export const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  defaultTab, 
  variant = 'default' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <TabContainer>
      <TabList $variant={variant}>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            $active={activeTab === tab.id}
            $variant={variant}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      {tabs.find(tab => tab.id === activeTab)?.content}
    </TabContainer>
  );
}; 