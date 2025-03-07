import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  width: ${({ $isOpen }) => ($isOpen ? '280px' : '0px')};
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background: ${({ theme }) => 
  theme.isDarkMode ? '#293041' : '#fff'};
  border-right: 0;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              background 0.3s ease, 
              box-shadow 0.3s ease,
              transform 0.3s ease,
              opacity 0.3s ease,
              visibility 0.2s ease;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => 
    theme.isDarkMode ? 'none' : '0 0 15px rgba(0,0,0,0.05)'};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => 
      theme.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
    border-radius: 4px;
  }
  
  * {
    transition: opacity 0.2s ease;
  }
`;

export const Logo = styled.div`
  padding: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
  
  h1 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => 
      theme.isDarkMode ? '#f8f9fa' : theme.colors.text};
  }
  
  p {
    margin: 0;
    font-size: 0.8rem;
    color: ${({ theme }) => 
      theme.isDarkMode ? 'rgba(255,255,255,0.5)' : theme.colors.gray[600]};
  }

  svg {
    min-width: 28px;
    height: 28px;
    margin-right: 0;
    margin-bottom: 8px;
  }
  
  div {
    opacity: 1;
    transition: opacity 0.3s ease;
    white-space: nowrap;
  }
`;

export const NavSection = styled.div`
  padding: 0 8px;
  margin-bottom: 16px;
`;

export const NavHeader = styled.div`
  padding: 0 16px;
  margin-top: 12px;
  margin-bottom: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => 
    theme.isDarkMode ? 'rgba(255,255,255,0.4)' : theme.colors.gray[600]};
  letter-spacing: 0.5px;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 8px 14px;
  margin-bottom: 3px;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => 
    theme.isDarkMode ? 'rgba(255,255,255,0.6)' : theme.colors.gray[700]};
  transition: all 0.15s ease;
  position: relative;
  font-size: 0.95rem;
  
  svg {
    stroke-width: 1.5;
    width: 18px;
    height: 18px;
    margin-right: 12px;
    min-width: 18px;
    opacity: ${({ theme }) => theme.isDarkMode ? 0.8 : 1};
    transition: all 0.15s ease;
  }
  
  span {
    flex: 1;
    white-space: nowrap;
  }
  
  &:hover {
    background: ${({ theme }) => 
      theme.isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'};
    color: ${({ theme }) => 
      theme.isDarkMode ? '#fff' : theme.colors.primary};
      
    svg {
      color: ${({ theme }) => theme.colors.primary};
      opacity: 1;
    }
  }
  
  &.active {
    background: ${({ theme }) => 
      theme.isDarkMode ? 'rgba(82, 122, 255, 0.15)' : 'rgba(0, 102, 255, 0.08)'};
    color: ${({ theme }) => 
      theme.isDarkMode ? '#fff' : theme.colors.primary};
    font-weight: 500;
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
      opacity: 1;
    }
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.65rem;
  font-weight: 600;
  margin-left: 8px;
`;

export const Divider = styled.div`
  height: 1px;
  margin: 8px 16px 16px;
  background: ${({ theme }) => 
    theme.isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'};
`;

export const NavDropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 14px;
  margin-bottom: 3px;
  border-radius: 6px;
  cursor: pointer;
  color: ${({ theme }) => 
    theme.isDarkMode ? 'rgba(255,255,255,0.6)' : theme.colors.gray[700]};
  font-weight: 400;
  transition: all 0.15s ease;
  font-size: 0.95rem;
  
  svg {
    stroke-width: 1.5;
    width: 18px;
    height: 18px;
    margin-right: 12px;
    min-width: 18px;
    opacity: ${({ theme }) => theme.isDarkMode ? 0.8 : 1};
    transition: all 0.15s ease;
  }
  
  &:hover {
    background: ${({ theme }) => 
      theme.isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'};
    color: ${({ theme }) => 
      theme.isDarkMode ? '#fff' : theme.colors.primary};
      
    svg {
      color: ${({ theme }) => theme.colors.primary};
      opacity: 1;
    }
  }
`;

export const DropdownIcon = styled.div<{ $isOpen: boolean }>`
  margin-left: auto;
  font-size: 1.2rem;
  font-weight: 300;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(90deg)' : 'rotate(0)'};
  transition: transform 0.2s ease;
  color: ${({ theme }) => 
    theme.isDarkMode ? 'rgba(255,255,255,0.4)' : theme.colors.gray[400]};
`;

export const DropdownContent = styled.div<{ $isOpen: boolean }>`
  height: ${({ $isOpen }) => ($isOpen ? 'auto' : '0')};
  overflow: hidden;
  margin-left: 2.5rem;
  transition: height 0.3s ease;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: visibility 0.3s, opacity 0.3s, height 0.3s ease;
`;

export const SubNavItem = styled(NavLink)`
  display: block;
  padding: 6px 14px;
  margin-bottom: 2px;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => 
    theme.isDarkMode ? 'rgba(255,255,255,0.5)' : theme.colors.gray[600]};
  font-size: 0.9rem;
  transition: all 0.15s ease;
  
  &:hover {
    background: ${({ theme }) => 
      theme.isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'};
    color: ${({ theme }) => 
      theme.isDarkMode ? '#fff' : theme.colors.primary};
  }
  
  &.active {
    background: ${({ theme }) => 
      theme.isDarkMode ? 'rgba(82, 122, 255, 0.15)' : 'rgba(0, 102, 255, 0.08)'};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 12px 16px;
  border-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CollapseButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${({ theme }) => 
    theme.isDarkMode ? 'rgba(255,255,255,0.5)' : theme.colors.gray[600]};
  transition: all 0.15s ease;
  
  &:hover {
    background: ${({ theme }) => 
      theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ theme }) => 
      theme.isDarkMode ? '#fff' : theme.colors.primary};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;