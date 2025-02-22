import React from 'react';
import { TeamList as TeamListComponent } from '../../components/features/team/TeamList';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api/axios';

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  projectCount: number;
  imageUrl?: string;
}

const TeamList = () => {
  const navigate = useNavigate();
  
  const { data: teams = [] } = useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data } = await api.get('/teams');
      return data;
    },
  });

  const handleCreateClick = () => {
    navigate('/teams/create');
  };

  const handleTeamClick = (teamId: string) => {
    navigate(`/teams/${teamId}`);
  };

  return (
    <TeamListComponent 
      teams={teams}
      onCreateClick={handleCreateClick}
      onTeamClick={handleTeamClick}
    />
  );
};

export default TeamList;

export * from './TeamList';