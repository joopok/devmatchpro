import styled from 'styled-components';
import { ProjectStatus } from '../../../types/project';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 2rem;
`;

export const StatusBadge = styled.span<{ status: ProjectStatus }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'OPEN':
        return theme.colors.success + '20';
      case 'IN_PROGRESS':
        return theme.colors.warning + '20';
      case 'COMPLETED':
        return theme.colors.info + '20';
      default:
        return theme.colors.gray + '20';
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'OPEN':
        return theme.colors.success;
      case 'IN_PROGRESS':
        return theme.colors.warning;
      case 'COMPLETED':
        return theme.colors.info;
      default:
        return theme.colors.gray;
    }
  }};
`; 