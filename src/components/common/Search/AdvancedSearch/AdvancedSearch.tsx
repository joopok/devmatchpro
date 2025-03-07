import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { Button } from '../../Button';
import { Tag } from '../../Tag';
import {
  SearchContainer,
  SearchHeader,
  FilterSection,
  FilterGrid,
  SelectedFilters,
  SearchActions,
} from './AdvancedSearch.styles';
import { WorkType } from '../../../../types/project';

interface SearchFilters {
  query: string;
  skills: string[];
  workType: WorkType[];
  experienceLevel: string;
  budget: {
    min?: number;
    max?: number;
  };
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading?: boolean;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { control, handleSubmit } = useForm<SearchFilters>();

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const onSubmit = (data: SearchFilters) => {
    onSearch({
      ...data,
      skills: selectedSkills,
    });
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchHeader>
          <h2>고급 검색</h2>
        </SearchHeader>

        <FilterSection>
          <FilterGrid>
            <Controller
              name="query"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="검색어 입력"
                />
              )}
            />
            
            <Controller
              name="workType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: 'REMOTE', label: '원격' },
                    { value: 'ONSITE', label: '상주' },
                    { value: 'HYBRID', label: '혼합' },
                  ]}
                  placeholder="근무 형태"
                />
              )}
            />
          </FilterGrid>

          <SelectedFilters>
            {selectedSkills.map(skill => (
              <Tag
                key={skill}
                label={skill}
                onRemove={() => handleSkillRemove(skill)}
              />
            ))}
          </SelectedFilters>
        </FilterSection>

        <SearchActions>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '검색 중...' : '검색'}
          </Button>
        </SearchActions>
      </form>
    </SearchContainer>
  );
}; 