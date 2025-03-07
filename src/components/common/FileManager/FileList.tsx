import React from 'react';
import { FileType } from '../../../types/file';

interface FileListProps {
  files: FileType[];
  searchQuery: string;
  selectedFolder: string | null;
  onDelete: (fileId: string) => void;
  onUpload: (files: File[]) => void;
}

export const FileListComponent: React.FC<FileListProps> = ({
  files,
  searchQuery,
  selectedFolder,
  onDelete,
  onUpload,
}) => {
  // 컴포넌트 구현
  return (
    <div>
      {/* 파일 목록 렌더링 */}
    </div>
  );
}; 