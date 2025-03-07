import React from 'react';
import { Dropdown } from '../../../common/Dropdown';
import { Button } from '../../../common/Button';
import { MoreVertical, Edit, Trash2, Share2 } from 'lucide-react';

interface ProjectActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  const menuItems = [
    {
      id: 'share',
      label: '공유',
      onClick: () => {/* 공유 로직 */},
    },
    {
      id: 'divider',
      label: '',  // 빈 label 추가
      divider: true,
    },
    {
      id: 'delete',
      label: '삭제',
      onClick: onDelete,
      variant: 'danger',
    },
  ];

  return (
    <Dropdown
      trigger={
        <Button aria-label="프로젝트 메뉴">
          <MoreVertical />
        </Button>
      }
      items={menuItems}
    />
  );
}; 