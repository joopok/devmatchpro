import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { toggleTheme } from '../../../store/theme/themeSlice';
import { SunIcon, MoonIcon } from '../../common/Icons';

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

  return (
    <ToggleButton onClick={() => dispatch(toggleTheme())}>
      {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </ToggleButton>
  );
}; 