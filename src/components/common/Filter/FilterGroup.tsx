import React from 'react';
import {
  FilterContainer,
  FilterTitle,
  FilterList,
  FilterItem,
  FilterCheckbox,
  FilterLabel,
} from './FilterGroup.styles';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  selected,
  onChange,
}) => {
  const handleToggle = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(item => item !== id)
      : [...selected, id];
    onChange(newSelected);
  };

  return (
    <FilterContainer>
      <FilterTitle>{title}</FilterTitle>
      <FilterList>
        {options.map(option => (
          <FilterItem key={option.id}>
            <FilterCheckbox
              type="checkbox"
              id={option.id}
              checked={selected.includes(option.id)}
              onChange={() => handleToggle(option.id)}
            />
            <FilterLabel htmlFor={option.id}>
              {option.label}
              {option.count !== undefined && ` (${option.count})`}
            </FilterLabel>
          </FilterItem>
        ))}
      </FilterList>
    </FilterContainer>
  );
}; 