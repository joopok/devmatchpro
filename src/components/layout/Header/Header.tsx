import React from 'react';
import styled from '@emotion/styled';
import { useAuth } from '../../../hooks/useAuth';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Header = () => {
  const { user } = useAuth();

  return (
    <HeaderContainer>
      <div>
        <h1>DevMatch Pro</h1>
      </div>
      <div>
        {user && (
          <span>
            {user.name} ({user.email})
          </span>
        )}
      </div>
    </HeaderContainer>
  );
}; 