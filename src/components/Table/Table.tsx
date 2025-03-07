import React, { useState } from 'react';
import styled from 'styled-components';

interface TableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    title: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
  }>;
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: keyof T) => void;
}

// 스타일 컴포넌트
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const TableHeaderCell = styled.th<{ $sortable?: boolean }>`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  position: relative;
  
  &:hover {
    background-color: ${({ $sortable, theme }) => 
      $sortable ? theme.colors.backgroundHover : 'inherit'};
  }
`;

const SortIcon = styled.span<{ $direction: 'asc' | 'desc' }>`
  margin-left: 8px;
  opacity: 0.6;
  
  &::after {
    content: ${({ $direction }) => 
      $direction === 'asc' ? '"▲"' : '"▼"'};
    font-size: 10px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: normal;
  word-break: break-word;
`;

const EmptyRow = styled.tr``;

const EmptyCell = styled.td`
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export function Table<T extends { id: string | number }>({
  data,
  columns,
  sortColumn,
  sortDirection = 'asc',
  onSort,
}: TableProps<T>) {
  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map((column) => (
              <TableHeaderCell
                key={String(column.key)}
                $sortable={column.sortable}
                onClick={() => {
                  if (column.sortable && onSort) {
                    onSort(column.key);
                  }
                }}
              >
                {column.header}
                {sortColumn === column.key && (
                  <SortIcon $direction={sortDirection} />
                )}
              </TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <EmptyRow>
              <EmptyCell colSpan={columns.length}>
                데이터가 없습니다.
              </EmptyCell>
            </EmptyRow>
          ) : (
            data.map((item) => (
              <TableRow key={String(item.id)}>
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${String(column.key)}`}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.key] || '')}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
} 