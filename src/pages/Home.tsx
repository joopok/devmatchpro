import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>홈</h1>
    </HomeContainer>
  );
};

export default Home; 