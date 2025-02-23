import React from 'react';
import { useParams } from 'react-router-dom';

const TeamDetail = () => {
  const { id } = useParams();
  return <div>Team Detail {id}</div>;
};

export default TeamDetail; 