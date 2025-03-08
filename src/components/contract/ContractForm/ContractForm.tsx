import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { DatePicker } from '../../DateTimeSelector';  
import { TextArea } from '../../TextArea';
import {
  FormContainer,
  FormTitle,
  Section,
  SectionTitle,
  InputGroup,
  TermsContainer,
  SignatureArea,
} from './ContractForm.styles';

interface ContractFormData {
  projectTitle: string;
  clientName: string;
  developerName: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  paymentTerms: string;
  milestones: Array<{
    title: string;
    amount: number;
    dueDate: string;
  }>;
  terms: string;
  signature: string;
}

interface ContractFormProps {
  initialData?: Partial<ContractFormData>;
  onSubmit: (data: ContractFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ContractForm: React.FC<ContractFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContractFormData>({
    defaultValues: {
      ...initialData,
      milestones: initialData?.milestones || [
        { title: '', amount: 0, dueDate: '' },
      ],
    },
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>프로젝트 계약서</FormTitle>

      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <InputGroup>
          <Input
            label="프로젝트명"
            {...register('projectTitle', { required: '프로젝트명을 입력해주세요' })}
            error={!!errors.projectTitle}
            helperText={errors.projectTitle?.message}
          />
        </InputGroup>

        <InputGroup>
          <Input
            label="클라이언트명"
            {...register('clientName', { required: '클라이언트명을 입력해주세요' })}
            error={!!errors.clientName}
            helperText={errors.clientName?.message}
          />
          <Input
            label="개발자명"
            {...register('developerName', { required: '개발자명을 입력해주세요' })}
            error={!!errors.developerName}
            helperText={errors.developerName?.message}
          />
        </InputGroup>

        <InputGroup>
          <DatePicker
            label="시작일"
            control={control}
            name="startDate"
            rules={{ required: '시작일을 선택해주세요' }}
          />
          <DatePicker
            label="종료일"
            control={control}
            name="endDate"
            rules={{ required: '종료일을 선택해주세요' }}
          />
        </InputGroup>
      </Section>

      <Section>
        <SectionTitle>계약 조건</SectionTitle>
        <InputGroup>
          <Input
            label="총 계약금액"
            type="number"
            {...register('totalAmount', { required: '계약금액을 입력해주세요' })}
            error={!!errors.totalAmount}
            helperText={errors.totalAmount?.message}
          />
        </InputGroup>

        <InputGroup>
          <TextArea
            label="지급 조건"
            rows={3}
            {...register('paymentTerms', { required: '지급 조건을 입력해주세요' })}
            error={!!errors.paymentTerms}
            helperText={errors.paymentTerms?.message}
          />
        </InputGroup>
      </Section>

      <Section>
        <SectionTitle>계약 조항</SectionTitle>
        <TermsContainer>
          <TextArea
            rows={10}
            {...register('terms', { required: '계약 조항을 입력해주세요' })}
            error={!!errors.terms}
            helperText={errors.terms?.message}
          />
        </TermsContainer>
      </Section>

      <Section>
        <SectionTitle>서명</SectionTitle>
        <SignatureArea>
          <Input
            label="전자 서명"
            {...register('signature', { required: '서명을 입력해주세요' })}
            error={!!errors.signature}
            helperText={errors.signature?.message}
          />
        </SignatureArea>
      </Section>

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? '처리 중...' : '계약서 작성 완료'}
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