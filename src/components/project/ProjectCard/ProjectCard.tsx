import React from 'react';
import { Project } from '../../../types/project';
import { Card, Title, Description, Tags, Tag, Footer } from './ProjectCard.styles';
import { formatDate } from '../../../utils/date';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Title>{project.title}</Title>
      <Description>{project.description}</Description>
      <Tags>
        {project.requiredSkills.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </Tags>
      <Footer>
        <span>예산: {project.budget.min.toLocaleString()}원 ~ {project.budget.max.toLocaleString()}원</span>
        <span>마감일: {project.duration.end ? formatDate(project.duration.end) : '미정'}</span>
      </Footer>
    </Card>
  );
}; 