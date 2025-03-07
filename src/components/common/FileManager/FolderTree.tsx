import React from 'react';
import { FolderType } from '../../../types/file';

interface FolderTreeProps {
  selectedFolder: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onCreateFolder: (name: string) => void;
  folders: FolderType[];
}

export const FolderTree: React.FC<FolderTreeProps> = ({
  selectedFolder,
  onFolderSelect,
  onCreateFolder,
  folders,
}) => {
  return (
    <div className="space-y-2">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className={`p-2 cursor-pointer ${
            selectedFolder === folder.id ? 'bg-blue-100' : ''
          }`}
          onClick={() => onFolderSelect(folder.id)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  );
}; 