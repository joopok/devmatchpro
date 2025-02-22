import React, { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import {
  SearchContainer,
  SearchInput,
  SearchIcon,
  ClearButton,
} from './SearchBar.styles';

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = '검색어를 입력하세요',
  initialValue = '',
  debounceMs = 300,
}) => {
  const [value, setValue] = useState(initialValue);
  const debouncedSearch = useDebounce(onSearch, debounceMs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {value && <ClearButton onClick={handleClear}>&times;</ClearButton>}
    </SearchContainer>
  );
}; 