import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Checkbox } from '../Checkbox/Checkbox';

interface Column<T> {
  key: keyof T;
  title: string;
  header: string;
  width?: string | number;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: keyof T) => void;
  onRowClick?: (item: T) => void;
}

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tr = styled.tr<{ clickable?: boolean }>`
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  
  &:hover {
    background-color: ${({ clickable, theme }) =>
      clickable ? theme.colors.backgroundAlt : 'transparent'};
  }
`;

export function Table<T>({ data, columns, sortColumn, sortDirection, onSort, onRowClick }: TableProps<T>) {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <Th key={String(column.key)} style={{ width: column.width }}>
                {column.header}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Tr
              key={index}
              onClick={() => onRowClick?.(item)}
              clickable={!!onRowClick}
            >
              {columns.map((column) => (
                <Td key={String(column.key)}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : (item as any)[column.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const TableHeaderCell = styled.th<{
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}>`
  padding: 12px 16px;
  font-weight: 600;
  text-align: ${({ align }) => align || 'left'};
  width: ${({ width }) => width || 'auto'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
  
  ${({ sortable }) =>
    sortable &&
    css`
      cursor: pointer;
      user-select: none;
      
      &:hover {
        background-color: ${({ theme }) => theme.colors.backgroundHover};
      }
    `}
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SortIcon = styled.span<{ direction: 'asc' | 'desc' }>`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  
  ${({ direction }) =>
    direction === 'asc'
      ? css`
          border-bottom: 4px solid currentColor;
        `
      : css`
          border-top: 4px solid currentColor;
        `}
`;

const TableBody = styled.tbody`
  background-color: ${({ theme }) => theme.colors.surface};
`;

const getRowHeight = (height: 'default' | 'compact' | 'relaxed') => {
  switch (height) {
    case 'compact':
      return '40px';
    case 'relaxed':
      return '64px';
    default:
      return '52px';
  }
};

const TableRow = styled.tr<{
  height: 'default' | 'compact' | 'relaxed';
  hoverable: boolean;
  selected?: boolean;
}>`
  height: ${({ height }) => getRowHeight(height)};
  
  ${({ hoverable }) =>
    hoverable &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.backgroundHover};
      }
    `}
    
  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.colors.primaryLight};
    `}
`;

const TableCell = styled.td<{
  align?: 'left' | 'center' | 'right';
}>`
  padding: 12px 16px;
  text-align: ${({ align }) => align || 'left'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 