import styled from 'styled-components';

export const BoardContainer = styled.div`
  padding: 20px;
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ColumnContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  min-width: 300px;
  max-width: 300px;
`;

export const ColumnHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTaskList = styled.div`
  padding: 8px;
  min-height: 100px;
`;

export const StyledTaskCard = styled.div<{ isDragging?: boolean }>`
  background: white;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: ${({ isDragging }) => 
    isDragging ? '0 5px 10px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)'};
`;

export const TaskTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
`;

export const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AddTaskButton = styled.button`
  width: 100%;
  padding: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

export const AddColumnButton = styled.button`
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const TaskCount = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TaskDescription = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 