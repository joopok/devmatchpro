import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.textPrimary};
  border: none;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primaryDark : theme.colors.backgroundHover};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PageEllipsis = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // 페이지 버튼 숫자 생성 로직
  const getPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2; // 현재 페이지 주변에 표시할 페이지 수
    
    if (totalPages <= 7) {
      // 전체 페이지가 7개 이하면 모든 페이지 버튼을 표시
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 항상 첫 페이지 버튼 표시
      pageNumbers.push(1);
      
      // 현재 페이지가 4보다 크면 '...' 표시
      if (currentPage > 4) {
        pageNumbers.push('ellipsis1');
      }
      
      // 현재 페이지 주변의 페이지 버튼 표시
      const rangeStart = Math.max(2, currentPage - delta);
      const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
      
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pageNumbers.push(i);
      }
      
      // 현재 페이지가 전체 페이지 - 3보다 작으면 '...' 표시
      if (currentPage < totalPages - 3) {
        pageNumbers.push('ellipsis2');
      }
      
      // 항상 마지막 페이지 버튼 표시
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &#8592;
      </PageButton>
      
      {getPageNumbers().map((page, index) => (
        page === 'ellipsis1' || page === 'ellipsis2' ? (
          <PageEllipsis key={`ellipsis-${index}`}>
            …
          </PageEllipsis>
        ) : (
          <PageButton
            key={`page-${page}`}
            $active={page === currentPage}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </PageButton>
        )
      ))}
      
      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &#8594;
      </PageButton>
    </PaginationContainer>
  );
}; 