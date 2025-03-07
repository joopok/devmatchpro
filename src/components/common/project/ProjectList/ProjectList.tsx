import React from 'react';
import { Project, ProjectStatus } from '../../../../types/project';
import { Card } from '../../../common/Card';
import { 
  ListContainer,
  LoadingSpinner,
  ErrorMessage,
  ProjectGrid,
  StatusBadge,
} from './ProjectList.styles';

interface ProjectListProps {
  projects: Project[];
  loading?: boolean;
  error?: string;
  onProjectSelect?: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loading,
  error,
  onProjectSelect,
}) => {
  return (
    <ListContainer>
      {loading && <LoadingSpinner>로딩 중...</LoadingSpinner>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && !error && (
        <ProjectGrid>
          {projects.map((project) => (
            <Card 
              key={project.id}
              onClick={() => onProjectSelect?.(project.id)}
            >
              <div>
                <h3>{project.title}</h3>
                <StatusBadge status={project.status}>
                  {project.status}
                </StatusBadge>
              </div>
              <p>{project.description}</p>
            </Card>
          ))}
        </ProjectGrid>
      )}
    </ListContainer>
  );
};

export default ProjectList; 