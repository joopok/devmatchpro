import { useState, useCallback } from 'react';
import { FileType, FolderType, FileManagerState } from '../types/file';

export const useFileManager = () => {
  const [state, setState] = useState<FileManagerState>({
    files: [],
    folders: [],
    selectedFolder: null,
    searchQuery: '',
  });

  const uploadFiles = useCallback(async (files: File[]) => {
    try {
      // 파일 업로드 로직
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }, []);

  const deleteFile = useCallback(async (fileId: string) => {
    try {
      // 파일 삭제 로직
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }, []);

  const createFolder = useCallback(async (name: string, parentId?: string) => {
    try {
      // 폴더 생성 로직
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }, []);

  return {
    state,
    uploadFiles,
    deleteFile,
    createFolder,
    setSelectedFolder: (folderId: string | null) => 
      setState(prev => ({ ...prev, selectedFolder: folderId })),
    setSearchQuery: (query: string) => 
      setState(prev => ({ ...prev, searchQuery: query })),
  };
}; 