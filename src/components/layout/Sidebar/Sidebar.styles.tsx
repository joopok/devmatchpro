import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../../styles/theme';
interface StyledProps {
  theme: Theme;
}

export const SidebarContainer = styled.aside<StyledProps>`
  width: 240px;
  background-color: ${({ theme }) => theme.colors.sidebar};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 24px 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Logo = styled.div`
  padding: 0 24px 24px;
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    background-clip: text;
    color: transparent;
  }
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 4px;
  }
`;

export const NavSection = styled.div`
  margin-bottom: 24px;
`;

export const NavHeader = styled.div`
  padding: 12px 24px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
// NavHeader 컴포넌트 추가
export const h2 = styled.h2`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  margin: 1.5rem 0 0.5rem;
  padding: 0 1rem;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: ${({ theme }) => theme.colors.sidebarText};
  text-decoration: none;
  transition: all 0.2s ease;
  
  svg {
    margin-right: 12px;
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
  }
  
  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

export const Badge = styled.span`
  margin-left: auto;
  padding: 2px 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 12px;
`;




