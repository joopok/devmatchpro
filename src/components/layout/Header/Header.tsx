import React from 'react';
import styled from 'styled-components';
import { UserSessionInfo } from './UserSessionInfo';
import { SearchBar } from './SearchBar';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from './ThemeToggle';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SearchSection = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LeftSection>
        <img src="/assets/img/logo.svg" alt="AppStock" height="32" />
      </LeftSection>

      <SearchSection>
        <SearchBar
          placeholder="프로젝트, 문서, 설정 등 검색..."
          onSearch={(query) => console.log('Search:', query)}
        />
      </SearchSection>

      <RightSection>
        <ActionButtons>
          <ThemeToggle />
          <NotificationBell count={3} />
          <button>
            <img src="/assets/img/icons/help.svg" alt="Help" />
          </button>
          <button>
            <img src="/assets/img/icons/settings.svg" alt="Settings" />
          </button>
        </ActionButtons>
        <UserSessionInfo />
      </RightSection>
    </HeaderContainer>
  );
}; 