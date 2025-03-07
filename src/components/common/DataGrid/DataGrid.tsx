import React, { useState } from 'react';
import { Table } from '../../Table/Table';
import { Pagination } from '../Pagination/Pagination';
import { SearchBar } from '../search/SearchBar';
import { FilterGroup } from '../Filter/FilterGroup';
import {
  DataGridContainer,
  ToolbarContainer,
  FiltersContainer,
} from './DataGrid.styles';

interface DataGridProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    title: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
  }>;
  filters?: Array<{
    key: string;
    title: string;
    options: Array<{ id: string; label: string }>;
  }>;
  pageSize?: number;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  onFilter?: (filters: Record<string, string[]>) => void;
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void;
}

export function DataGrid<T extends { id: string | number }>({
  data,
  columns,
  filters,
  pageSize = 10,
  searchPlaceholder,
  onSearch,
  onFilter,
  onSort,
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof T | undefined>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleSort = (column: keyof T) => {
    const newDirection = 
      column === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort?.(column, newDirection);
  };

  const handleFilter = (key: string, selected: string[]) => {
    const newFilters = { ...activeFilters, [key]: selected };
    setActiveFilters(newFilters);
    onFilter?.(newFilters);
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <DataGridContainer>
      <ToolbarContainer>
        {onSearch && (
          <SearchBar
            onSearch={onSearch}
            placeholder={searchPlaceholder}
          />
        )}
      </ToolbarContainer>

      {filters && (
        <FiltersContainer>
          {filters.map(filter => (
            <FilterGroup
              key={filter.key}
              title={filter.title}
              options={filter.options}
              selected={activeFilters[filter.key] || []}
              onChange={(selected) => handleFilter(filter.key, selected)}
            />
          ))}
        </FiltersContainer>
      )}

      <Table
        data={paginatedData}
        columns={columns}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </DataGridContainer>
  );
} 