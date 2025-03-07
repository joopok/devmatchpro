import React from 'react';
import { Modal } from '../../../common/Modal/Modal';
import { Button } from '../../../common/Button/Button';
import {
  ConfirmMessage,
  WarningText,
  ProjectTitle,
} from './ProjectDeleteModal.styles';

interface ProjectDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string;
  isLoading?: boolean;
}

export const ProjectDeleteModal: React.FC<ProjectDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  projectTitle,
  isLoading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="프로젝트 삭제"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            취소
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
            삭제
          </Button>
        </>
      }
    >
      <ConfirmMessage>
        정말 <ProjectTitle>{projectTitle}</ProjectTitle> 프로젝트를
        삭제하시겠습니까?
      </ConfirmMessage>
      <WarningText>
        이 작업은 되돌릴 수 없으며, 관련된 모든 데이터가 영구적으로
        삭제됩니다.
      </WarningText>
    </Modal>
  );
}; 