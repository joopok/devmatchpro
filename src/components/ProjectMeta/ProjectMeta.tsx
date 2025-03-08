import React from 'react';
import styled from 'styled-components';

interface ProjectMetaProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const ProjectMeta: React.FC<ProjectMetaProps> = ({ icon, label, value }) => {
  return (
    <Container>
      <IconWrapper>{icon}</IconWrapper>
      <Content>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Value = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`; 