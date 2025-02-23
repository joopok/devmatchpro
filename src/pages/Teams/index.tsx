import React from 'react';
import styled from 'styled-components';
import TeamList from './TeamList';

const TeamsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Teams = () => {
  return (
    <TeamsContainer>
      <h1>팀</h1>
      <TeamList />
    </TeamsContainer>
  );
};

export default Teams; 