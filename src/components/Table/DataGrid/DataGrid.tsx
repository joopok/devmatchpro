import React, { useState, useMemo } from 'react';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { Checkbox } from '../../Checkbox';
import { Button } from '../../Button';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import {
  GridContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  FilterBar,
  SelectionBar,
  SortIndicator,
} from './DataGrid.styles';

interface Column<T> {
  field: keyof T;
  header: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (value: T[keyof T], row: T) => React.ReactNode;
  renderFilter?: (value: string, onChange: (value: string) => void) => React.ReactNode;
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: Array<T[keyof T]>) => void;
  onSortChange?: (field: keyof T, direction: 'asc' | 'desc') => void;
  onFilterChange?: (filters: Record<keyof T, string>) => void;
  onRowClick?: (row: T) => void;
  pageSize?: number;
  loading?: boolean;
  error?: string;
  onPageSizeChange?: (newSize: number) => void;
  pageSizeOptions?: number[];
}

export function DataGrid<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  selectable = false,
  onSelectionChange,
  onSortChange,
  onFilterChange,
  onRowClick,
  pageSize = 10,
  loading,
  error,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [selectedRows, setSelectedRows] = useState<Array<T[keyof T]>>([]);

  const handleSort = (field: keyof T) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    onSortChange?.(field, newDirection);
  };

  const handleFilter = (field: keyof T, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newSelection = checked ? data.map((row) => row[keyField]) : [];
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectRow = (rowId: T[keyof T]) => {
    const newSelection = selectedRows.includes(rowId)
      ? selectedRows.filter((id) => id !== rowId)
      : [...selectedRows, rowId];
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <GridContainer>
      {error && <div className="error">{error}</div>}

      {selectable && selectedRows.length > 0 && (
        <SelectionBar>
          <span>{selectedRows.length}개 항목 선택됨</span>
          <Button
            variant="text"
            onClick={() => 
              handleSelectAll({ 
                target: { checked: false } 
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            선택 해제
          </Button>
        </SelectionBar>
      )}

      {columns.some((col) => col.filterable) && (
        <FilterBar>
          {columns
            .filter((col) => col.filterable)
            .map((col) => (
              <div key={String(col.field)}>
                {col.renderFilter ? (
                  col.renderFilter(
                    filters[col.field] || '',
                    (value) => handleFilter(col.field, value)
                  )
                ) : (
                  <Input
                    placeholder={`${col.header} 검색...`}
                    value={filters[col.field] || ''}
                    onChange={(e) => handleFilter(col.field, e.target.value)}
                  />
                )}
              </div>
            ))}
        </FilterBar>
      )}

      <div className="table-container">
        <table>
          <TableHeader>
            <tr>
              {selectable && (
                <th>
                  <Checkbox
                    checked={selectedRows.length === data.length}
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < data.length
                    }
                    onChange={(checked) => 
                      handleSelectAll({ 
                        target: { checked } 
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.field)}
                  style={{ width: column.width }}
                  className={column.sortable ? 'sortable' : ''}
                  onClick={() =>
                    column.sortable && handleSort(column.field)
                  }
                >
                  {column.header}
                  {column.sortable && sortField === column.field && (
                    <SortIndicator direction={sortDirection}>
                      {sortDirection === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </SortIndicator>
                  )}
                </th>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  로딩 중...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <TableRow
                  key={String(row[keyField])}
                  selected={selectedRows.includes(row[keyField])}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedRows.includes(row[keyField])}
                        onChange={() => handleSelectRow(row[keyField])}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={String(column.field)}>
                      {column.renderCell
                        ? column.renderCell(row[column.field], row)
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <Button
            onClick={() => setCurrentPage(1)}
            variant="secondary"
            disabled={currentPage === 1}
          >
            <ChevronsLeft size={16} />
          </Button>
          <Button
            variant="icon"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="icon"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
          <Button
            onClick={() => setCurrentPage(totalPages)}
            variant="secondary"
            disabled={currentPage === totalPages}
          >
            <ChevronsRight size={16} />
          </Button>
          <Select
            value={String(pageSize)}
            onChange={(value) => {
              const newSize = Number(value);
              setCurrentPage(1);
              onPageSizeChange?.(newSize);
            }}
            options={pageSizeOptions.map(size => ({
              value: String(size),
              label: `${size}개씩 보기`
            }))}
          />
        </Pagination>
      )}
    </GridContainer>
  );
} 