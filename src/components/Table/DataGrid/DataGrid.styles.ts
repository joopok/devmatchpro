import styled, { css } from 'styled-components';

export const GridContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

export const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  
  th {
    padding: 12px;
    font-weight: 600;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    
    &.sortable {
      cursor: pointer;
      user-select: none;
    }
  }
`;

export const TableBody = styled.tbody`
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TableRow = styled.tr<{ selected?: boolean }>`
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
  
  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.colors.backgroundSelected};
    `}
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SelectionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

export const SortIndicator = styled.span<{ direction: 'asc' | 'desc' }>`
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
`; 