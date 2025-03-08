import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Select } from '../../Select';
import {
  FormContainer,
  FormTitle,
  InputGroup,
  AmountDisplay,
  PaymentSummary,
} from './PaymentForm.styles';

interface PaymentFormData {
  amount: number;
  paymentMethod: string;
  description?: string;
}

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isLoading?: boolean;
}

const paymentMethods = [
  { value: 'CARD', label: '신용카드' },
  { value: 'BANK', label: '계좌이체' },
  { value: 'VIRTUAL', label: '가상계좌' },
];

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<PaymentFormData>();

  const amount = watch('amount', 0);
  const paymentMethod = watch('paymentMethod');

  return (
    <FormContainer>
      <FormTitle>결제하기</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Input
            {...register('amount', {
              required: '금액을 입력해주세요',
              min: {
                value: 1000,
                message: '최소 결제 금액은 1,000원입니다',
              },
            })}
            type="number"
            label="금액"
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        </InputGroup>

        <AmountDisplay>
          {amount.toLocaleString('ko-KR')}원
        </AmountDisplay>

        <InputGroup>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: '결제 수단을 선택해주세요' }}
            render={({ field }) => (
              <Select
                options={paymentMethods}
                value={field.value}
                onChange={field.onChange}
                placeholder="결제 수단 선택"
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod?.message}
              />
            )}
          />
        </InputGroup>

        <InputGroup>
          <Input
            {...register('description')}
            label="결제 내용"
            placeholder="결제 내용을 입력해주세요"
          />
        </InputGroup>

        <PaymentSummary>
          <p>총 결제 금액: {amount.toLocaleString('ko-KR')}원</p>
        </PaymentSummary>

        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? '처리 중...' : '결제하기'}
        </Button>
      </form>
    </FormContainer>
  );
}; 