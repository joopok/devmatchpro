import React from 'react';
import { Project } from '../../../types/project';

interface ProjectOverviewProps {
  project: Project;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  return (
    <div>
      <h3>프로젝트 개요</h3>
      <p>{project.description}</p>
    </div>
  );
}; 