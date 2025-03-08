import React, { useState } from 'react';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { Button } from '../../Button';
import { DateRangePicker } from '../../DateTimeSelector';
import { Tag } from '../../Tag';
import {
  FiltersContainer,
  FilterGroup,
  ActiveFilters,
  SavedFilters,
} from './TableFilters.styles';

interface FilterConfig {
  id: string;
  type: 'text' | 'select' | 'date' | 'number' | 'boolean';
  field: string;
  label: string;
  options?: Array<{ value: string; label: string }>;
  multiple?: boolean;
}

interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, any>;
}

interface TableFiltersProps {
  config: FilterConfig[];
  initialFilters?: Record<string, any>;
  savedFilters?: SavedFilter[];
  onFilterChange: (filters: Record<string, any>) => void;
  onSaveFilter?: (name: string, filters: Record<string, any>) => Promise<void>;
  onDeleteSavedFilter?: (id: string) => Promise<void>;
  isLoading?: boolean;
}

interface DateRange {
  start: string;
  end: string;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  config,
  initialFilters = {},
  savedFilters = [],
  onFilterChange,
  onSaveFilter,
  onDeleteSavedFilter,
  isLoading,
}) => {
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');

  const handleFilterChange = (field: string, value: any) => {
    const newFilters = { ...filters, [field]: value };
    if (!value) {
      delete newFilters[field];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilter = (field: string) => {
    const newFilters = { ...filters };
    delete newFilters[field];
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    setFilters({});
    onFilterChange({});
  };

  const handleSaveFilter = async () => {
    if (!filterName.trim() || !onSaveFilter) return;

    try {
      await onSaveFilter(filterName, filters);
      setFilterName('');
      setShowSaveDialog(false);
    } catch (error) {
      console.error('필터 저장 실패:', error);
    }
  };

  const handleApplySavedFilter = (savedFilter: SavedFilter) => {
    setFilters(savedFilter.filters);
    onFilterChange(savedFilter.filters);
  };

  const handleDateRangeChange = (range: DateRange) => {
    handleFilterChange(config.find(c => c.field === 'date')?.field || '', range);
  };

  const renderFilterInput = (filterConfig: FilterConfig) => {
    switch (filterConfig.type) {
      case 'select':
        return (
          <Select
            value={filters[filterConfig.field] || ''}
            onChange={(value) => handleFilterChange(filterConfig.field, value)}
            options={filterConfig.options || []}
            placeholder={`${filterConfig.label} 선택`}
          />
        );
      case 'date':
        return (
          <DateRangePicker
            name={`filter-${filterConfig.field}`}
            startDate={filters[filterConfig.field]?.start ? new Date(filters[filterConfig.field]?.start) : null}
            endDate={filters[filterConfig.field]?.end ? new Date(filters[filterConfig.field]?.end) : null}
            onChange={(value) => {
              if (typeof value === 'object' && value !== null && 
                  'startDate' in value && value.startDate instanceof Date && 
                  'endDate' in value && value.endDate instanceof Date) {
                const startDate = value.startDate.toISOString().split('T')[0];
                const endDate = value.endDate.toISOString().split('T')[0];
                handleFilterChange(filterConfig.field, { start: startDate, end: endDate });
              } else if (typeof value === 'object' && value !== null && 'start' in value && 'end' in value) {
                handleFilterChange(filterConfig.field, value);
              }
            }}
          />
        );
      case 'number':
        return (
          <div>
            <Input
              type="number"
              placeholder="최소"
              value={filters[filterConfig.field]?.min || ''}
              onChange={(e) =>
                handleFilterChange(filterConfig.field, {
                  ...filters[filterConfig.field],
                  min: e.target.value,
                })
              }
            />
            <Input
              type="number"
              placeholder="최대"
              value={filters[filterConfig.field]?.max || ''}
              onChange={(e) =>
                handleFilterChange(filterConfig.field, {
                  ...filters[filterConfig.field],
                  max: e.target.value,
                })
              }
            />
          </div>
        );
      case 'boolean':
        return (
          <Select
            value={filters[filterConfig.field] || ''}
            onChange={(value) => handleFilterChange(filterConfig.field, value)}
            options={[
              { value: '', label: '전체' },
              { value: 'true', label: '예' },
              { value: 'false', label: '아니오' },
            ]}
          />
        );
      default:
        return (
          <Input
            type="text"
            value={filters[filterConfig.field] || ''}
            onChange={(e) =>
              handleFilterChange(filterConfig.field, e.target.value)
            }
            placeholder={`${filterConfig.label} 검색...`}
          />
        );
    }
  };

  return (
    <FiltersContainer>
      <FilterGroup>
        {config.map((filterConfig) => (
          <div key={filterConfig.id}>
            <label>{filterConfig.label}</label>
            {renderFilterInput(filterConfig)}
          </div>
        ))}
      </FilterGroup>

      {Object.keys(filters).length > 0 && (
        <ActiveFilters>
          <div>
            <h4>활성 필터</h4>
            <Button variant="text" onClick={handleClearAll}>
              모두 지우기
            </Button>
          </div>
          <div>
            {Object.entries(filters).map(([field, value]) => {
              const filterConfig = config.find((c) => c.field === field);
              if (!filterConfig) return null;

              return (
                <Tag
                  key={field}
                  label={`${filterConfig.label}: ${
                    typeof value === 'object'
                      ? JSON.stringify(value)
                      : value
                  }`}
                  onDelete={() => handleClearFilter(field)}
                />
              );
            })}
          </div>
        </ActiveFilters>
      )}

      {savedFilters.length > 0 && (
        <SavedFilters>
          <h4>저장된 필터</h4>
          <div>
            {savedFilters.map((filter) => (
              <div key={filter.id}>
                <Button
                  variant="outline"
                  onClick={() => handleApplySavedFilter(filter)}
                >
                  {filter.name}
                </Button>
                {onDeleteSavedFilter && (
                  <Button
                    variant="icon"
                    onClick={() => onDeleteSavedFilter(filter.id)}
                    disabled={isLoading}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SavedFilters>
      )}

      {onSaveFilter && (
        <div>
          {showSaveDialog ? (
            <div>
              <Input
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="필터 이름"
              />
              <Button
                onClick={handleSaveFilter}
                disabled={isLoading || !filterName.trim()}
              >
                저장
              </Button>
              <Button
                variant="text"
                onClick={() => setShowSaveDialog(false)}
                disabled={isLoading}
              >
                취소
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowSaveDialog(true)}
              disabled={Object.keys(filters).length === 0}
            >
              현재 필터 저장
            </Button>
          )}
        </div>
      )}
    </FiltersContainer>
  );
}; 