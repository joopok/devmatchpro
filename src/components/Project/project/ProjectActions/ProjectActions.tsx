import React from 'react';
import { Dropdown } from '../../../common/Dropdown';
import { IconButton } from '../../../common/IconButton';
import { Icon } from '../../../../assets/Icon';

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
        <IconButton aria-label="프로젝트 메뉴">
          <Icon name="more-vertical" />
        </IconButton>
      }
      items={menuItems}
    />
  );
}; 