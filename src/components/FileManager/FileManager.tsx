import React from 'react';
import { FileType, FolderType } from '../../types/file';
import { FolderTree } from './FolderTree';
import { FileListComponent } from './FileList';
import { SearchBar } from './SearchBar';
import { useFileManager } from '../../hooks/useFileManager';
import { formatFileSize, getFileIcon } from '../../utils/fileUtils';

interface FileManagerProps {
  files: FileType[];
  folders: FolderType[];
  selectedFolder: string | null;
  searchQuery: string;
  onFolderSelect: (folderId: string | null) => void;
  onCreateFolder: (name: string) => void;
  onDeleteFile: (fileId: string) => void;
  onUploadFiles: (files: File[]) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  folders,
  selectedFolder,
  searchQuery,
  onFolderSelect,
  onCreateFolder,
  onDeleteFile,
  onUploadFiles,
}) => {
  const {
    uploadFiles,
    deleteFile,
    createFolder,
    setSelectedFolder,
    setSearchQuery,
  } = useFileManager();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex h-full" role="region" aria-label="파일 관리자">
      <div className="w-64 border-r">
        <FolderTree
          selectedFolder={selectedFolder}
          onFolderSelect={onFolderSelect}
          onCreateFolder={createFolder}
          folders={folders}
        />
      </div>
      <div className="flex-1 p-4">
        <SearchBar 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="파일 검색..."
        />
        <FileListComponent
          files={files}
          searchQuery={searchQuery}
          selectedFolder={selectedFolder}
          onDelete={deleteFile}
          onUpload={uploadFiles}
        />
      </div>
    </div>
  );
}; 