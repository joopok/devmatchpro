import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Project, ProjectStatus } from '../../../types/project';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { FileUpload } from '../../FileUpload';
import { Button } from '../../Button';
import {
  FormContainer,
  FormSection,
  FormTitle,
  InputGroup,
  ErrorText,
  ButtonGroup,
} from './ProjectForm.styles';
import { FormField } from './FormField';
import { useToast } from '../../Toast/Toast';
import { FileUploader } from '../../FileUploader/FileUploader';
import { TextArea } from '../../TextArea';
import type { ProjectFormData } from '../../../types/project';

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const workTypeOptions = [
  { value: 'REMOTE', label: '원격' },
  { value: 'ONSITE', label: '상주' },
  { value: 'HYBRID', label: '혼합' },
];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status || 'OPEN',
      budget: initialData?.budget || { min: 0, max: 0, currency: 'KRW' },
      requiredSkills: initialData?.requiredSkills || [],
      workType: initialData?.workType || 'REMOTE',
      duration: initialData?.duration || { start: '', end: '' },
    },
  });

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleSubmitForm = async (data: ProjectFormData) => {
    try {
      await onSubmit({ ...data, files });
      toast.show('success', '프로젝트가 성공적으로 저장되었습니다.');
    } catch (error) {
      toast.show('error', '프로젝트 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(handleSubmitForm)}>
      <FormTitle>{initialData ? '프로젝트 수정' : '새 프로젝트 등록'}</FormTitle>

      <FormSection>
        <InputGroup>
          <Input
            label="프로젝트 제목"
            {...register('title', { required: '프로젝트 제목을 입력해주세요' })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </InputGroup>

        <InputGroup>
          <TextArea
            label="프로젝트 설명"
            rows={4}
            {...register('description', { required: '프로젝트 설명을 입력해주세요' })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </InputGroup>

        <InputGroup>
          <Controller
            name="workType"
            control={control}
            rules={{ required: '근무 형태를 선택해주세요' }}
            render={({ field }) => (
              <Select
                options={workTypeOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="근무 형태 선택"
              />
            )}
          />
          {errors.workType && <ErrorText>{errors.workType.message}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Input
            label="예산 범위 (최소)"
            type="number"
            {...register('budget.min', { required: '최소 예산을 입력해주세요' })}
            error={!!errors.budget?.min}
            helperText={errors.budget?.min?.message}
          />
          <Input
            label="예산 범위 (최대)"
            type="number"
            {...register('budget.max', { required: '최대 예산을 입력해주세요' })}
            error={!!errors.budget?.max}
            helperText={errors.budget?.max?.message}
          />
        </InputGroup>

        <InputGroup>
          <Input
            label="시작일"
            type="date"
            {...register('duration.start', { required: '시작일을 선택해주세요' })}
            error={!!errors.duration?.start}
            helperText={errors.duration?.start?.message}
          />
          <Input
            label="종료일"
            type="date"
            {...register('duration.end')}
          />
        </InputGroup>

        <FormField label="첨부 파일">
          <FileUploader
            onFileSelect={handleFileSelect}
            accept={[
              'image/*',
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ]}
            maxSize={10 * 1024 * 1024} // 10MB
            maxFiles={5}
            showPreview
          />
        </FormField>
      </FormSection>

      <ButtonGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : initialData ? '수정하기' : '등록하기'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
}; 