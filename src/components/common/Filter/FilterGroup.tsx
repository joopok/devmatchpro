import React, { useState } from 'react';
import styled from 'styled-components';

const FilterGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

const FilterTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterOption = styled.div<{ $selected: boolean }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 13px;
  cursor: pointer;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ theme, $selected }) => 
    $selected ? theme.colors.white : theme.colors.textPrimary};
  
  &:hover {
    background-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.primaryDark : theme.colors.backgroundHover};
  }
`;

interface FilterGroupProps {
  title: string;
  options: Array<{ id: string; label: string }>;
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  selected,
  onChange,
}) => {
  const handleToggleOption = (optionId: string) => {
    if (selected.includes(optionId)) {
      onChange(selected.filter(id => id !== optionId));
    } else {
      onChange([...selected, optionId]);
    }
  };

  return (
    <FilterGroupContainer>
      <FilterTitle>{title}</FilterTitle>
      <FilterOptions>
        {options.map(option => (
          <FilterOption
            key={option.id}
            $selected={selected.includes(option.id)}
            onClick={() => handleToggleOption(option.id)}
          >
            {option.label}
          </FilterOption>
        ))}
      </FilterOptions>
    </FilterGroupContainer>
  );
}; 