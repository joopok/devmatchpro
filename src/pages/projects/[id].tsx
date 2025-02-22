import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>프로젝트 상세 #{id}</h1>
    </div>
  );
};

export default ProjectDetail; 