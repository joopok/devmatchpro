import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Select } from '../../Select';
import {
  FormContainer,
  FormTitle,
  Section,
  InputGroup,
  MilestoneList,
  MilestoneItem,
  AddButton,
} from './ProposalForm.styles';

interface Milestone {
  title: string;
  description: string;
  amount: number;
  dueDate: string;
}

interface ProposalFormData {
  coverLetter: string;
  totalAmount: number;
  duration: {
    start: string;
    end: string;
  };
  paymentType: 'FIXED' | 'HOURLY';
  hourlyRate?: number;
  estimatedHours?: number;
  milestones: Milestone[];
  attachments?: File[];
}

interface ProposalFormProps {
  projectId: string;
  onSubmit: (data: ProposalFormData) => void;
  isLoading?: boolean;
}

export const ProposalForm: React.FC<ProposalFormProps> = ({
  projectId,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProposalFormData>({
    defaultValues: {
      paymentType: 'FIXED',
      milestones: [
        {
          title: '',
          description: '',
          amount: 0,
          dueDate: '',
        },
      ],
    },
  });

  const paymentType = watch('paymentType');
  const milestones = watch('milestones');

  const handleAddMilestone = () => {
    const newMilestone = {
      title: '',
      description: '',
      amount: 0,
      dueDate: '',
    };
    setValue('milestones', [...milestones, newMilestone]);
  };

  const handleRemoveMilestone = (index: number) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    setValue('milestones', updatedMilestones);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>프로젝트 제안서</FormTitle>

      <Section>
        <InputGroup>
          <Input
            label="제안서 내용"
            multiline
            rows={6}
            {...register('coverLetter', {
              required: '제안 내용을 입력해주세요',
              minLength: {
                value: 200,
                message: '최소 200자 이상 작성해주세요',
              },
            })}
            error={!!errors.coverLetter}
            helperText={errors.coverLetter?.message}
            placeholder="프로젝트에 대한 이해도와 수행 계획을 상세히 작성해주세요"
          />
        </InputGroup>

        <InputGroup>
          <Select
            label="지불 방식"
            options={[
              { value: 'FIXED', label: '프로젝트 단위' },
              { value: 'HOURLY', label: '시간 단위' },
            ]}
            value={paymentType}
            onChange={(value) => setValue('paymentType', value as 'FIXED' | 'HOURLY')}
          />
        </InputGroup>

        {paymentType === 'HOURLY' ? (
          <>
            <InputGroup>
              <Input
                label="시간당 금액"
                type="number"
                {...register('hourlyRate', {
                  required: '시간당 금액을 입력해주세요',
                  min: {
                    value: 1,
                    message: '올바른 금액을 입력해주세요',
                  },
                })}
                error={!!errors.hourlyRate}
                helperText={errors.hourlyRate?.message}
              />
            </InputGroup>
            <InputGroup>
              <Input
                label="예상 소요 시간"
                type="number"
                {...register('estimatedHours', {
                  required: '예상 소요 시간을 입력해주세요',
                  min: {
                    value: 1,
                    message: '올바른 시간을 입력해주세요',
                  },
                })}
                error={!!errors.estimatedHours}
                helperText={errors.estimatedHours?.message}
              />
            </InputGroup>
          </>
        ) : (
          <Section>
            <h4>마일스톤</h4>
            <MilestoneList>
              {milestones.map((_, index) => (
                <MilestoneItem key={index}>
                  <Input
                    label="마일스톤 제목"
                    {...register(`milestones.${index}.title`, {
                      required: '마일스톤 제목을 입력해주세요',
                    })}
                    error={!!errors.milestones?.[index]?.title}
                    helperText={errors.milestones?.[index]?.title?.message}
                  />
                  <Input
                    label="설명"
                    multiline
                    rows={2}
                    {...register(`milestones.${index}.description`, {
                      required: '설명을 입력해주세요',
                    })}
                    error={!!errors.milestones?.[index]?.description}
                    helperText={errors.milestones?.[index]?.description?.message}
                  />
                  <Input
                    label="금액"
                    type="number"
                    {...register(`milestones.${index}.amount`, {
                      required: '금액을 입력해주세요',
                      min: {
                        value: 1,
                        message: '올바른 금액을 입력해주세요',
                      },
                    })}
                    error={!!errors.milestones?.[index]?.amount}
                    helperText={errors.milestones?.[index]?.amount?.message}
                  />
                  <Input
                    label="완료 예정일"
                    type="date"
                    {...register(`milestones.${index}.dueDate`, {
                      required: '완료 예정일을 입력해주세요',
                    })}
                    error={!!errors.milestones?.[index]?.dueDate}
                    helperText={errors.milestones?.[index]?.dueDate?.message}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleRemoveMilestone(index)}
                    >
                      삭제
                    </Button>
                  )}
                </MilestoneItem>
              ))}
            </MilestoneList>
            <AddButton type="button" onClick={handleAddMilestone}>
              + 마일스톤 추가
            </AddButton>
          </Section>
        )}
      </Section>

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? '제출 중...' : '제안서 제출하기'}
      </Button>
    </FormContainer>
  );
}; 