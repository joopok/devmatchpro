import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  disabled = false,
  className,
}) => {
  const paginationRange = useMemo(() => {
    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const totalPageNumbers = siblingCount * 2 + 3;
    
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [...range(1, leftItemCount), -1, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [1, -1, ...range(totalPages - rightItemCount + 1, totalPages)];
    }

    return [
      1,
      -1,
      ...range(leftSiblingIndex, rightSiblingIndex),
      -2,
      totalPages,
    ];
  }, [currentPage, totalPages, siblingCount]);

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer className={className}>
      {showFirstLast && (
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={disabled || currentPage === 1}
        >
          처음
        </PaginationButton>
      )}
      
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
      >
        이전
      </PaginationButton>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === -1 || pageNumber === -2) {
          return <Dots key={`dots-${index}`}>...</Dots>;
        }

        return (
          <PaginationButton
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={disabled}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
      >
        다음
      </PaginationButton>

      {showFirstLast && (
        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
        >
          마지막
        </PaginationButton>
      )}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ active, theme }) =>
    active &&
    css`
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      color: ${theme.colors.white};

      &:hover {
        background-color: ${theme.colors.primary};
      }
    `}
`;

const Dots = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 