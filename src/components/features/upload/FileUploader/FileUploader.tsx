import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../../../common/Button';
import {
  UploaderContainer,
  DropzoneArea,
  FileList,
  FileItem,
  FileInfo,
  RemoveButton,
} from './FileUploader.styles';

interface FileUploaderProps {
  files: File[];
  onFilesAdd: (newFiles: File[]) => void;
  onFileRemove: (index: number) => void;
  maxSize?: number;
  acceptedTypes?: string[];
  maxFiles?: number;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onFilesAdd,
  onFileRemove,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['application/pdf', 'image/*', '.doc', '.docx'],
  maxFiles = 5,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = maxFiles - files.length;
      const newFiles = acceptedFiles.slice(0, remainingSlots);
      if (newFiles.length > 0) {
        onFilesAdd(newFiles);
      }
    },
    [files.length, maxFiles, onFilesAdd],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: true,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <UploaderContainer>
      <DropzoneArea {...getRootProps()} isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <Button type="button">파일 선택</Button>
        <p>
          또는 파일을 이곳에 드래그하세요
          <br />
          <small>최대 {maxFiles}개 파일, 각 {formatFileSize(maxSize)} 이하</small>
        </p>
      </DropzoneArea>

      {files.length > 0 && (
        <FileList>
          {files.map((file, index) => (
            <FileItem key={`${file.name}-${index}`}>
              <FileInfo>
                <span>{file.name}</span>
                <small>{formatFileSize(file.size)}</small>
              </FileInfo>
              <RemoveButton
                type="button"
                onClick={() => onFileRemove(index)}
              >
                ✕
              </RemoveButton>
            </FileItem>
          ))}
        </FileList>
      )}
    </UploaderContainer>
  );
}; 