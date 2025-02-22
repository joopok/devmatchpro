import React from 'react';
import styled from 'styled-components';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  variant?: 'default' | 'pills';
}

const TabList = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TabButton = styled.button<{ $active?: boolean; $variant?: 'default' | 'pills' }>`
  padding: 8px 16px;
  border: none;
  background: ${({ $active, $variant, theme }) =>
    $variant === 'pills'
      ? $active
        ? theme.colors.primary
        : 'transparent'
      : 'transparent'};
  color: ${({ $active, $variant, theme }) =>
    $variant === 'pills'
      ? $active
        ? 'white'
        : theme.colors.text
      : $active
      ? theme.colors.primary
      : theme.colors.text};
  border-radius: ${({ $variant }) => ($variant === 'pills' ? '20px' : '0')};
  cursor: pointer;
  
  &:hover {
    background: ${({ $variant, theme }) =>
      $variant === 'pills' ? theme.colors.primaryLight : 'transparent'};
  }
`;

export const Tabs: React.FC<TabsProps> = ({ tabs, variant = 'default' }) => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]?.id);

  return (
    <div>
      <TabList>
        {tabs.map((tab) => (
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
      {tabs.find((tab) => tab.id === activeTab)?.content}
    </div>
  );
}; 