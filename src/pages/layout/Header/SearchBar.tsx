import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const SearchInput = styled.input`
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? '#3a4052' : '#dee2e6'};
  background-color: ${({ theme }) => theme.isDarkMode ? '#384056' : '#fff'};
  color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
  width: 100%;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.isDarkMode ? 'rgba(58, 133, 255, 0.3)' : 'rgba(0, 102, 255, 0.25)'};
    border-color: ${({ theme }) => theme.isDarkMode ? '#3a85ff' : '#0066ff'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.isDarkMode ? '#adb5bd' : '#6c757d'};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.isDarkMode ? '#adb5bd' : '#6c757d'};
  pointer-events: none;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.isDarkMode ? '#adb5bd' : '#6c757d'};
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.isDarkMode ? '#f8f9fa' : '#212529'};
  }
`;

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = '검색...', onSearch }) => {
  const [query, setQuery] = useState('');
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);
  
  return (
    <SearchContainer>
      <form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          aria-label="검색"
        />
        <SearchIcon>
          <Search size={16} />
        </SearchIcon>
      </form>
    </SearchContainer>
  );
}; 