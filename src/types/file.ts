import { BaseEntity } from './common';

// 메타데이터 인터페이스 분리
interface FileMetadata {
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
}

export interface File extends BaseEntity {
  name: string;
  size: number;
  type: string;
  url: string;
  path: string;
  folderId?: string;
  metadata?: FileMetadata;
  isDeleted: boolean;
}

export interface Folder extends BaseEntity {
  name: string;
  path: string;
  children: (File | Folder)[];
  parentId?: string;
  isDeleted: boolean;
}

export interface FileUploadResponse {
  file: File;
  uploadUrl: string;
}

export interface FileType {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  createdAt: string;
  updatedAt: string;
  extension?: string;
  folderId?: string | null;
  url?: string;
  thumbnail?: string;
}

export interface FolderType {
  id: string;
  name: string;
  parentId?: string;
  children: FolderType[];
}

export interface FileManagerState {
  files: FileType[];
  folders: FolderType[];
  selectedFolder: string | null;
  searchQuery: string;
}

export interface UploadProgress {
  fileId: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface FileFilter {
  type?: ('file' | 'folder')[];
  extension?: string[];
  folderId?: string | null;
  searchQuery?: string;
}