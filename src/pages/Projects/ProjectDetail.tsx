import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../../components/Card';
import { ProjectTimeline } from '../../components/project/ProjectTimeline';
import { ProjectIssues } from '../../components/project/ProjectIssues';

interface Project {
  id: string;
  title: string; 
  description: string;
  milestones: any[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) {
        throw new Error('프로젝트를 불러오는데 실패했습니다');
      }
      return response.json();
    },
    enabled: !!id,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.toString()}</div>;
  if (!project) return <div>프로젝트를 찾을 수 없습니다.</div>;

  return (
    <div>
      <Card>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </Card>
      <ProjectTimeline milestones={project.milestones} />
      <ProjectIssues projectId={project.id} />
    </div>
  );
};

export default ProjectDetail;