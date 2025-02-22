import React from 'react';
import { useParams } from 'react-router-dom';

const TeamDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>팀 상세 #{id}</h1>
    </div>
  );
};

export default TeamDetail; 