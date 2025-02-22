import React from 'react';

interface ProjectMembersProps {
  projectId: string;
}

export const ProjectMembers: React.FC<ProjectMembersProps> = ({ projectId }) => {
  return (
    <div>
      <h3>프로젝트 멤버</h3>
      {/* 멤버 목록 구현 */}
    </div>
  );
}; 