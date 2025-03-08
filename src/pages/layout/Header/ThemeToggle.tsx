import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../store/slices/themeSlice';
import { RootState } from '../../../store/store';
import { Moon, Sun } from 'lucide-react';

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ theme }) => theme.isDarkMode ? '#384056' : '#f8f9fa'};
  }

  svg {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const IconWrapper = styled.div<{ $isDarkMode: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .sun-icon,
  .moon-icon {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s ease, opacity 0.3s ease;
  }

  .sun-icon {
    opacity: ${({ $isDarkMode }) => $isDarkMode ? 1 : 0};
    transform: ${({ $isDarkMode }) => $isDarkMode ? 'translateY(0) rotate(0)' : 'translateY(10px) rotate(-30deg)'};
    color: #f8f9fa;
  }

  .moon-icon {
    opacity: ${({ $isDarkMode }) => $isDarkMode ? 0 : 1};
    transform: ${({ $isDarkMode }) => $isDarkMode ? 'translateY(-10px) rotate(30deg)' : 'translateY(0) rotate(0)'};
    color: #212529;
  }
`;

export const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <ToggleButton 
      onClick={handleThemeToggle}
      title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <IconWrapper $isDarkMode={isDarkMode}>
        <Sun className="sun-icon" size={20} />
        <Moon className="moon-icon" size={20} />
      </IconWrapper>
    </ToggleButton>
  );
};