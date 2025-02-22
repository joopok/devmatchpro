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
  type: string;
  size: number;
  url: string;
  folderId?: string;
  updatedAt: Date;
  isDeleted: boolean;
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