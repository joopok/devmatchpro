import React from 'react';
import { Card } from '../../Card';
import { Button } from '../../Button';
import { Avatar } from '../../Avatar';
import { Node, Edge, OnNodesChange, OnEdgesChange } from 'reactflow';

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  projectCount: number;
  imageUrl?: string;
}

interface TeamListProps {
  teams: Team[];
  onCreateClick: () => void;
  onTeamClick?: (teamId: string) => void;
}

export const TeamList: React.FC<TeamListProps> = ({
  teams,
  onCreateClick,
  onTeamClick,
}) => {
  return (
    <div>
      <Button onClick={onCreateClick}>새 팀 만들기</Button>
      <div style={{ marginTop: '16px' }}>
        {teams.map(team => (
          <Card
            key={team.id}
            onClick={() => onTeamClick?.(team.id)}
            style={{ marginBottom: '16px', cursor: onTeamClick ? 'pointer' : 'default' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Avatar 
                src={team.imageUrl} 
                name={team.name}
                alt={team.name} 
              />
              <div>
                <h3>{team.name}</h3>
                <p>{team.description}</p>
                <div style={{ display: 'flex', gap: '16px', color: '#666' }}>
                  <span>멤버 {team.memberCount}명</span>
                  <span>프로젝트 {team.projectCount}개</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}; 