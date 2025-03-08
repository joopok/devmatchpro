import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input';
import { Button } from '../../Button';
import {
  FormContainer,
  FormTitle,
  InputGroup,
  ErrorText,
} from './ApplicationForm.styles';
import { TextArea } from '../../TextArea';

interface ApplicationFormData {
  proposal: string;
  expectedDuration: string;
  proposedBudget: number;
}

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>();

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>프로젝트 지원하기</FormTitle>

      <InputGroup>
        <TextArea
          {...register('proposal', { 
            required: '제안서를 작성해주세요',
            minLength: {
              value: 100,
              message: '최소 100자 이상 작성해주세요',
            },
          })}
          label="제안서"
          rows={6}
          placeholder="프로젝트에 대한 본인의 역량과 제안을 작성해주세요."
          error={!!errors.proposal}
          helperText={errors.proposal?.message}
        />
      </InputGroup>

      <InputGroup>
        <Input
          label="예상 개발 기간"
          type="text"
          placeholder="예: 2개월"
          {...register('expectedDuration', { 
            required: '예상 개발 기간을 입력해주세요' 
          })}
          error={!!errors.expectedDuration}
          helperText={errors.expectedDuration?.message}
        />
      </InputGroup>

      <InputGroup>
        <Input
          label="제안 금액"
          type="number"
          placeholder="금액을 입력해주세요"
          {...register('proposedBudget', {
            required: '제안 금액을 입력해주세요',
            min: {
              value: 0,
              message: '0보다 큰 금액을 입력해주세요',
            },
          })}
          error={!!errors.proposedBudget}
          helperText={errors.proposedBudget?.message}
        />
      </InputGroup>

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? '제출 중...' : '지원하기'}
      </Button>
      <Button 
        type="button" 
        variant="secondary" 
        fullWidth 
        onClick={onCancel}
      >
        취소
      </Button>
    </FormContainer>
  );
}; 