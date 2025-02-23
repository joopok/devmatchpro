import React, { useCallback } from 'react';
import { UserSessionInfo } from './UserSessionInfo';
import { SearchBar } from './SearchBar';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from './ThemeToggle';
import { 
  HeaderContainer,
  LeftSection,
  RightSection, 
  SearchSection,
  ActionButtons,
  ToggleButton,
} from './Header.styles';

export const Header: React.FC = () => {
  const handleSidebarToggle = useCallback(() => {
    const sidebar = document.querySelector('aside') as HTMLElement;
    if (sidebar) {
      sidebar.style.transform = sidebar.style.transform === 'translateX(-100%)' 
        ? 'translateX(0)' 
        : 'translateX(-100%)';
      sidebar.style.transition = 'transform 0.3s ease';
    }
  }, []);

  return (
    <HeaderContainer>
    <LeftSection>
        <ToggleButton onClick={handleSidebarToggle}>
          <img 
            src='/assets/img/logo.svg' 
            alt="AppStock" 
            height={32}
            style={{ cursor: 'pointer' }}
          />
        </ToggleButton>
      </LeftSection>

      <SearchSection style={{ marginLeft: 0 }}>
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
            <img src={process.env.PUBLIC_URL + '/assets/img/icons/help.svg'} alt="Help" />
          </button>
          <button>
            <img src={process.env.PUBLIC_URL + '/assets/img/icons/settings.svg'} alt="Settings" />
          </button>
        </ActionButtons>
        <UserSessionInfo />
      </RightSection>
    </HeaderContainer>
  );
};