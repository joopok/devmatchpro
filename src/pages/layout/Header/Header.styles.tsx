
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.isDarkMode ? '#293042' : '#fff'};
  border-bottom: 1px solid ${({ theme }) => 
    theme.isDarkMode ? '#202634' : theme.colors.border};
  transition: all 0.3s ease;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const SearchSection = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
  min-width: 240px;

  input {
    background: ${({ theme }) => theme.isDarkMode ? '#202634' : '#fff'};
    color: ${({ theme }) => theme.isDarkMode ? theme.colors.sidebarText : theme.colors.text};
    border-color: ${({ theme }) => theme.isDarkMode ? '#3a4358' : theme.colors.border};

    &::placeholder {
      color: ${({ theme }) => theme.isDarkMode ? '#6c7293' : theme.colors.textSecondary};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.isDarkMode ? '#202634' : '#fff'};
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    color: ${({ theme }) => theme.isDarkMode ? theme.colors.sidebarText : theme.colors.text};
    
    &:hover {
      background: ${({ theme }) => theme.isDarkMode ? '#3a4358' : theme.colors.backgroundHover};
    }
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.colors.text};
  
  &:hover {
    background: ${({ theme }) => theme.isDarkMode ? '#3a4358' : theme.colors.backgroundHover};
    border-radius: 4px;
  }
`;