import styled from 'styled-components';

export const ManagerContainer = styled.div`
  display: flex;
  gap: 24px;
`;

export const FileList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  span {
    font-size: 24px;
  }

  div {
    h4 {
      margin: 0;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.text};
    }

    p {
      margin: 4px 0 0;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const FileActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const FolderTree = styled.div`
  min-width: 250px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

export const FolderItem = styled.div<{ selected?: boolean }>`
  padding: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.backgroundAlt : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

export const SearchBar = styled.div`
  margin-bottom: 16px;
`;

export const ToolBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`; 