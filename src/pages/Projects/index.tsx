import React from 'react';
import styled from 'styled-components';
import { ProjectList } from './ProjectList';

const ProjectsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Projects = () => {
  return (
    <ProjectsContainer>
      <h1>프로젝트111</h1>
      <ProjectList />
    </ProjectsContainer>
  );
};

export default Projects; 