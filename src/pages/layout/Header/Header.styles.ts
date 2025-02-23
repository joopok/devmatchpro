import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  height: 72px;
  background: ${({ theme }) => theme.isDarkMode ? '#293042' : '#fff'};
  border-bottom: 1px solid ${({ theme }) => 
    theme.isDarkMode ? '#202634' : theme.colors.border};
  transition: all 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 240px;
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
    border-radius: 4px;
    background: ${({ theme }) => theme.isDarkMode ? '#202634' : '#fff'};
    color: ${({ theme }) => theme.isDarkMode ? theme.colors.sidebarText : theme.colors.text};
    border: 1px solid ${({ theme }) => theme.isDarkMode ? '#3a4358' : theme.colors.border};

    &::placeholder {
      color: ${({ theme }) => theme.isDarkMode ? '#6c7293' : theme.colors.textSecondary};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.isDarkMode ? '#202634' : '#fff'};
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.isDarkMode ? theme.colors.sidebarText : theme.colors.text};
    background: none;
    border: none;
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
  justify-content: center;
  color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.colors.text};
  border-radius: 4px;
  
  &:hover {
    background: ${({ theme }) => theme.isDarkMode ? '#3a4358' : theme.colors.backgroundHover};
  }

  img {
    width: 24px;
    height: 24px;
  }
`; 