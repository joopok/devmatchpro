import React from 'react';
import { Tooltip } from '../../Tooltip';
import { StatusBadge } from '../../StatusBadge';
import { ProjectStatus as ProjectStatusType } from '../../../types/project';

interface ProjectStatusProps {
  status: ProjectStatusType;
}

const getStatusLabel = (status: ProjectStatusType): string => {
  switch (status) {
    case 'PLANNING':
      return '계획중';
    case 'IN_PROGRESS':
      return '진행중';
    case 'COMPLETED':
      return '완료';
    case 'ON_HOLD':
      return '보류';
    case 'CANCELLED':
      return '취소';
    default:
      return '알 수 없음';
  }
};

const getStatusDescription = (status: ProjectStatusType): string => {
  switch (status) {
    case 'OPEN':
      return '프로젝트 지원자를 모집하고 있습니다';
    case 'IN_PROGRESS':
      return '프로젝트가 진행중입니다';
    case 'COMPLETED':
      return '프로젝트가 완료되었습니다';
    case 'CANCELLED':
      return '프로젝트가 취소되었습니다';
    default:
      return '알 수 없음';
  }
};

const getStatusColor = (status: ProjectStatusType) => {
  switch (status) {
    case 'OPEN':
      return 'success';
    case 'IN_PROGRESS':
      return 'warning';
    case 'COMPLETED':
      return 'primary';
    case 'CANCELLED':
      return 'error';
    default:
      return 'default';
  }
};

export const ProjectStatusComponent: React.FC<ProjectStatusProps> = ({ status }) => {
  return (
    <Tooltip
      content={getStatusDescription(status)}
      placement="right"
    >
      <StatusBadge status={status}>
        {getStatusLabel(status)}
      </StatusBadge>
    </Tooltip>
  );
};