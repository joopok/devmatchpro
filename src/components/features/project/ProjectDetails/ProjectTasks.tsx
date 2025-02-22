import React from 'react';

interface ProjectTasksProps {
  projectId: string;
}

export const ProjectTasks: React.FC<ProjectTasksProps> = ({ projectId }) => {
  return (
    <div>
      <h3>작업 목록</h3>
      {/* 작업 목록 구현 */}
    </div>
  );
}; 