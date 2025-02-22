import styled from '@emotion/styled';

export const UploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DropzoneArea = styled.div<{ isDragActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border: 2px dashed ${({ isDragActive }) => (isDragActive ? '#007bff' : '#ddd')};
  border-radius: 8px;
  background-color: ${({ isDragActive }) => (isDragActive ? '#f8f9fa' : '#fff')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #007bff;
    background-color: #f8f9fa;
  }

  p {
    margin: 0;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;

    small {
      color: #999;
    }
  }
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #eee;
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 0.9rem;
    color: #333;
  }

  small {
    font-size: 0.8rem;
    color: #666;
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: #e9ecef;
  color: #495057;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #dee2e6;
    color: #212529;
  }
`; 