import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 36px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  &::before {
    content: '🔍';
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`; 