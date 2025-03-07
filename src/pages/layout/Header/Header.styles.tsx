import styled from 'styled-components';

export const HeaderContainer = styled.header<{ $isSidebarOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 0 ${({ $isSidebarOpen }) => ($isSidebarOpen ? '260px' : '50px')};
  height: 72px;
  background: ${({ theme }) => theme.isDarkMode ? '#1e2232' : '#fff'};
  border-bottom: 0;
  color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
  transition: all 0.3s ease, padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0 1rem 0 50px;
  }
`;

// 사이드바 토글 섹션
export const SidebarToggle = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 250;
  height: 72px;
  width: 50px;
  background: transparent;
  border-right: 0;
  transition: background 0.3s ease;
  
  button {
    position: relative;
    background-color: transparent;
    border-radius: 6px;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    padding: 0;
    cursor: pointer;
    margin-left: 0;
    
    svg {
      color: ${({ theme }) => theme.isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
      width: 24px;
      height: 24px;
    }
    
    &:hover {
      background-color: ${({ theme }) => theme.isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
      
      svg {
        color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
      }
    }
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 240px;
  margin-left: -5px;
  
  @media (max-width: 768px) {
    margin-left: -5px;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-width: 240px;
`;

export const SearchSection = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 2rem;
  
  input {
    width: 100%;
    height: 40px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border-radius: 4px;
    background: ${({ theme }) => theme.isDarkMode ? '#1f2633' : '#fff'};
    color: ${({ theme }) => theme.isDarkMode ? theme.colors.sidebarText : theme.colors.text};
    border: 0;

    &::placeholder {
      color: ${({ theme }) => theme.isDarkMode ? '#6c7293' : theme.colors.textSecondary};
    }

    &:focus {
      outline: 0;
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.isDarkMode ? '#1f2633' : '#fff'};
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.colors.text};

  button {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.isDarkMode ? theme.colors.sidebarText : theme.colors.text};
    background: none;
    border: 0;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.isDarkMode ? '#3a4358' : theme.colors.backgroundHover};
    }

    img {
      width: 20px;
      height: 20px;
      color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.colors.text};
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.colors.text};
  border-radius: 4px;
  
  &:hover {
    background: ${({ theme }) => theme.isDarkMode ? '#3a4358' : theme.colors.backgroundHover};
  }

  img {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.colors.text};
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.isDarkMode ? '#adb5bd' : '#6c757d'};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
    background: ${({ theme }) => theme.isDarkMode ? '#384056' : '#f8f9fa'};
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
`;

export const Badge = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.isDarkMode ? '0 0 0 2px #293041' : '0 0 0 2px #fff'};
`; 