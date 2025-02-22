import React from 'react';
import styled from 'styled-components';

interface FileUploadProps {
  children: React.ReactNode;
  onUpload?: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  children,
  onUpload,
  accept,
  multiple,
  disabled,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && onUpload) {
      onUpload(event.target.files);
    }
  };

  return (
    <Container>
      <input
        type="file"
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        {children}
      </label>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;

  label {
    cursor: pointer;
    display: inline-block;

    &:hover {
      opacity: 0.8;
    }
  }
`; 