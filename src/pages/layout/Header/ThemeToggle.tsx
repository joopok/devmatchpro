import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { toggleTheme, setTheme } from '../../../store/theme/themeSlice';
import { SunIcon, MoonIcon } from '../../../components/common/Icons';

const ToggleButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  // 컴포넌트 마운트 시 localStorage의 테마 상태 확인
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' && !isDarkMode) {
      dispatch(setTheme(true));
    } else if (savedTheme === 'light' && isDarkMode) {
      dispatch(setTheme(false));
    }
  }, []);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <ToggleButton onClick={handleThemeToggle}>
      {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </ToggleButton>
  );
};