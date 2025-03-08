import React from 'react';
import { Button } from '../Button';
import * as S from './TeamList.styles';

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
  onTeamClick: (teamId: string) => void;
}

export const TeamList: React.FC<TeamListProps> = ({
  teams,
  onCreateClick,
  onTeamClick,
}) => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>팀 목록</S.Title>
        <Button onClick={onCreateClick}>팀 생성</Button>
      </S.Header>
      <S.Grid>
        {teams.map((team) => (
          <S.TeamCard key={team.id} onClick={() => onTeamClick(team.id)}>
            {team.imageUrl && <S.TeamImage src={team.imageUrl} alt={team.name} />}
            <S.TeamInfo>
              <S.TeamName>{team.name}</S.TeamName>
              <S.TeamDescription>{team.description}</S.TeamDescription>
              <S.TeamStats>
                <S.Stat>멤버 {team.memberCount}명</S.Stat>
                <S.Stat>프로젝트 {team.projectCount}개</S.Stat>
              </S.TeamStats>
            </S.TeamInfo>
          </S.TeamCard>
        ))}
      </S.Grid>
    </S.Container>
  );
}; 