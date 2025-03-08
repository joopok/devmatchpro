import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  onFileRemove?: (file: File) => void;
  accept?: string[] | Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  showPreview?: boolean;
  className?: string;
  initialFiles?: File[];
  variant?: 'simple' | 'advanced';
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  previewType?: 'list' | 'grid';
  buttonText?: string;
  dropzoneText?: string;
  children?: React.ReactNode;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  onFileRemove,
  accept = ['image/*', 'application/pdf'],
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 5,
  multiple = true,
  disabled = false,
  showPreview = true,
  className,
  initialFiles,
  variant = 'advanced',
  label,
  helperText,
  error = false,
  errorMessage = '파일 업로드에 문제가 발생했습니다.',
  previewType = 'list',
  buttonText = '파일 선택하기',
  dropzoneText = '파일을 여기에 드래그하거나 클릭하여 업로드하세요',
  children,
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles || []);

  useEffect(() => {
    if (initialFiles) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFileSelect(newFiles);
    },
    [files, maxFiles, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: typeof accept === 'object' && !Array.isArray(accept) 
      ? accept 
      : (Array.isArray(accept) ? accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}) : {}),
    maxSize,
    multiple,
    disabled,
  });

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    onFileRemove?.(file);
    onFileSelect(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  // Simple variant for basic upload functionality
  if (variant === 'simple') {
    return (
      <SimpleContainer className={className}>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              const fileList = Array.from(e.target.files);
              setFiles(fileList);
              onFileSelect(fileList);
            }
          }}
          accept={Array.isArray(accept) ? accept.join(',') : Object.keys(accept).join(',')}
          multiple={multiple}
          disabled={disabled}
          style={{ display: 'none' }}
          id="simple-file-upload"
        />
        {children || (
          <SimpleButton htmlFor="simple-file-upload" disabled={disabled}>
            {buttonText}
          </SimpleButton>
        )}
        {helperText && <HelperText $error={error}>{helperText}</HelperText>}
        {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SimpleContainer>
    );
  }

  // Advanced variant with dropzone and preview
  return (
    <UploaderContainer className={className}>
      {label && <UploadLabel>{label}</UploadLabel>}
      <DropZone
        {...getRootProps()}
        isDragActive={isDragActive}
        disabled={disabled}
        $error={error}
      >
        <input {...getInputProps()} />
        {children || (
          <DropzoneContent>
            <UploadIcon>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </UploadIcon>
            <DropzoneText>
              {isDragActive
                ? '파일을 여기에 놓으세요'
                : dropzoneText}
            </DropzoneText>
            <DropzoneSubText>
              최대 {formatFileSize(maxSize)}, {maxFiles}개 파일까지
            </DropzoneSubText>
          </DropzoneContent>
        )}
      </DropZone>

      {helperText && <HelperText $error={error}>{helperText}</HelperText>}
      {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      {showPreview && files.length > 0 && (
        <FileList $previewType={previewType}>
          {files.map((file, index) => (
            <FileItem key={`${file.name}-${index}`} $previewType={previewType}>
              <FileInfo>
                <FileIcon>
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <polyline points="13 2 13 9 20 9" />
                    </svg>
                  )}
                </FileIcon>
                <div>
                  <FileName>{file.name}</FileName>
                  <FileSize>{formatFileSize(file.size)}</FileSize>
                </div>
              </FileInfo>
              <RemoveButton
                onClick={() => removeFile(file)}
                disabled={disabled}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </RemoveButton>
            </FileItem>
          ))}
        </FileList>
      )}
    </UploaderContainer>
  );
};

const UploaderContainer = styled.div`
  width: 100%;
`;

const SimpleContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
`;

const SimpleButton = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const UploadLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 4px;
`;

const DropZone = styled.div<{
  isDragActive: boolean;
  disabled: boolean;
  $error?: boolean;
}>`
  border: 2px dashed ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ isDragActive, theme }) =>
    isDragActive &&
    css`
      border-color: ${theme.colors.primary};
      background-color: ${theme.colors.primaryLight};
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      border-color: ${theme.colors.border};
      background-color: ${theme.colors.backgroundAlt};
    `}
`;

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const UploadIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;

const DropzoneText = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const DropzoneSubText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FileList = styled.div<{ $previewType?: 'list' | 'grid' }>`
  margin-top: 16px;
  display: ${({ $previewType }) => $previewType === 'grid' ? 'grid' : 'flex'};
  ${({ $previewType }) => $previewType === 'grid' && `
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  `}
  ${({ $previewType }) => $previewType === 'list' && `
    flex-direction: column;
    gap: 8px;
  `}
`;

const FileItem = styled.div<{ $previewType?: 'list' | 'grid' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  
  ${({ $previewType }) => $previewType === 'grid' && `
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    overflow: hidden;
  `}
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const FileIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const FileName = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 