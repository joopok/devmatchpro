import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../Tag';

interface SkillsListProps {
  skills: string[];
}

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  return (
    <SkillsContainer>
      {skills.map((skill) => (
        <Tag key={skill} label={skill} />
      ))}
    </SkillsContainer>
  );
}; 