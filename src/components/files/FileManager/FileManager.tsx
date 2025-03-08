import React, { useState, useMemo } from 'react';
import { FileUpload } from '../../FileUpload';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { FileText, Folder as FolderIcon, Search, Upload, Download, Trash2, Plus } from 'lucide-react';
import {
  ManagerContainer,
  FileList,
  FileItem,
  FileInfo,
  FileActions,
  FolderTree,
  FolderItem,
  SearchBar,
  ToolBar,
} from './FileManager.styles';
import { File, Folder } from '../../../types/file';

interface FileManagerProps {
  files: File[];
  folders: Folder[];
  onUpload: (files: FileList) => void;
  onDelete: (fileId: string) => void;
  onCreateFolder: (name: string, parentId?: string) => void;
  onMove: (fileId: string, folderId: string) => void;
  isLoading?: boolean;
  selectedFolder?: string;
  onFolderSelect?: (folderId: string) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  folders,
  onUpload,
  onDelete,
  onCreateFolder,
  onMove,
  isLoading,
  selectedFolder,
  onFolderSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText size={18} />;
      case 'folder':
        return <FolderIcon size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFolder = !selectedFolder || file.folderId === selectedFolder;
      return matchesSearch && matchesFolder && !file.isDeleted;
    });
  }, [files, searchQuery, selectedFolder]);

  const buildFolderTree = (folders: Folder[], parentId?: string): Folder[] => {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((folder) => ({
        ...folder,
        children: buildFolderTree(folders, folder.id),
      }));
  };

  const renderFolderTree = (folders: Folder[]) => {
    return (
      <FolderTree>
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            selected={folder.id === selectedFolder}
            onClick={() => onFolderSelect?.(folder.id)}
          >
            <span>📁 {folder.name}</span>
            {folder.children && folder.children.length > 0 && (
              <div style={{ marginLeft: '1rem' }}>
                {renderFolderTree(folder.children as Folder[])}
              </div>
            )}
          </FolderItem>
        ))}
      </FolderTree>
    );
  };

  const handleCreateFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newFolderName.trim()) {
      onCreateFolder(newFolderName.trim(), selectedFolder);
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  const handleFolderInputBlur = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim(), selectedFolder);
    }
    setNewFolderName('');
    setShowNewFolderInput(false);
  };

  return (
    <ManagerContainer>
      <div>
        <SearchBar>
          <Input
            placeholder="파일 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<FileText />}
          />
        </SearchBar>

        <ToolBar>
          <FileUpload
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            multiple
            onUpload={onUpload}
          >
            <Button>
              <Upload /> 파일 업로드
            </Button>
          </FileUpload>

          <Button onClick={() => setShowNewFolderInput(true)}>
            <Plus /> 새 폴더
          </Button>
        </ToolBar>

        {showNewFolderInput && (
          <Input
            autoFocus
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="새 폴더 이름"
            onKeyPress={handleCreateFolder}
            onBlur={handleFolderInputBlur}
          />
        )}

        {renderFolderTree(buildFolderTree(folders))}
      </div>

      <FileList>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : filteredFiles.length === 0 ? (
          <div>파일이 없습니다.</div>
        ) : (
          filteredFiles.map((file) => (
            <FileItem key={file.id}>
              <FileInfo>
                <span>{getFileIcon(file.type)}</span>
                <div>
                  <h4>{file.name}</h4>
                  <p>{formatFileSize(file.size)}</p>
                  <p>수정일: {new Date(file.updatedAt).toLocaleDateString()}</p>
                </div>
              </FileInfo>
              <FileActions>
                <Button
                  variant="text"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  <FileText /> 보기
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = file.url;
                    link.download = file.name;
                    link.click();
                  }}
                >
                  <Download /> 다운로드
                </Button>
                <Button
                  variant="text"
                  color="danger"
                  onClick={() => onDelete(file.id)}
                >
                  <Trash2 /> 삭제
                </Button>
              </FileActions>
            </FileItem>
          ))
        )}
      </FileList>
    </ManagerContainer>
  );
}; 