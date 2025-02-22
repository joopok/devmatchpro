import styled from '@emotion/styled';

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const PreviewImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

export const UploadButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: transparent;
  color: #007bff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`; 