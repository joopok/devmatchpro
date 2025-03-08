import { Tabs } from '../../Tabs';
import { ProjectOverview } from './ProjectOverview';
import { ProjectTasks } from './ProjectTasks';
import { ProjectFiles } from './ProjectFiles';
import { ProjectMembers } from './ProjectMembers';
import { Project } from '../../../types/project';

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <Tabs
      tabs={[
        {
          id: 'overview',
          label: '개요',
          content: <ProjectOverview project={project} />,
        },
        {
          id: 'tasks',
          label: '작업',
          content: <ProjectTasks projectId={project.id} />,
        },
        {
          id: 'files',
          label: '파일',
          content: <ProjectFiles projectId={project.id} />,
        },
        {
          id: 'members',
          label: '멤버',
          content: <ProjectMembers projectId={project.id} />,
        },
      ]}
      defaultTab="overview"
      variant="contained"
    />
  );
}; 