import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Select } from '../../Select';
import {
  ProcessorContainer,
  PaymentMethods,
  PaymentMethod,
  PaymentDetails,
  InputGroup,
  SummarySection,
  ProcessingOverlay,
  ButtonGroup,
} from './PaymentProcessor.styles';
import { PaymentMethodType } from '../../../types/payment';

interface PaymentFormData {
  method: PaymentMethodType;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  bankCode?: string;
  accountNumber?: string;
}

interface PaymentProcessorProps {
  amount: number;
  onSubmit: (data: PaymentFormData) => Promise<void>;
  onCancel: () => void;
}

const formatAmount = (amount: number) => {
  return amount.toLocaleString('ko-KR');
};

export const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  amount,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    defaultValues: {
      method: 'CARD',
    },
  });

  const selectedMethod = watch('method');

  return (
    <ProcessorContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PaymentMethods>
          <Select
            value={selectedMethod}
            onChange={(value) => register('method').onChange({ target: { value } })}
            options={[
              { value: 'CARD', label: '신용카드' },
              { value: 'BANK', label: '계좌이체' },
              { value: 'VIRTUAL', label: '가상계좌' }
            ]}
          />
        </PaymentMethods>

        <PaymentDetails>
          {selectedMethod === 'CARD' && (
            <>
              <InputGroup>
                <Input
                  {...register('cardNumber', {
                    required: '카드번호를 입력해주세요',
                    pattern: {
                      value: /^[0-9]{16}$/,
                      message: '올바른 카드번호를 입력해주세요',
                    },
                  })}
                  label="카드번호"
                  placeholder="1234 5678 9012 3456"
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  {...register('expiryDate', {
                    required: '유효기간을 입력해주세요',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                      message: 'MM/YY 형식으로 입력해주세요',
                    },
                  })}
                  label="유효기간"
                  placeholder="MM/YY"
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate?.message}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  {...register('cvv', {
                    required: 'CVV를 입력해주세요',
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: '올바른 CVV를 입력해주세요',
                    },
                  })}
                  label="CVV"
                  placeholder="123"
                  error={!!errors.cvv}
                  helperText={errors.cvv?.message}
                />
              </InputGroup>
            </>
          )}

          {selectedMethod === 'BANK' && (
            <>
              <InputGroup>
                <Select
                  {...register('bankCode')}
                  value={watch('bankCode') || ''}
                  options={[
                    { value: '001', label: 'Bank A' },
                    { value: '002', label: 'Bank B' },
                  ]}
                  onChange={(value) => {
                    register('bankCode').onChange({ target: { value } });
                  }}
                  label="은행 선택"
                  error={!!errors.bankCode}
                  helperText={errors.bankCode?.message}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  {...register('accountNumber', {
                    required: '계좌번호를 입력해주세요',
                  })}
                  label="계좌번호"
                  placeholder="'-' 없이 입력해주세요"
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber?.message}
                />
              </InputGroup>
            </>
          )}
        </PaymentDetails>

        <SummarySection>
          <p>결제 금액: {formatAmount(amount)}원</p>
        </SummarySection>

        <ButtonGroup>
          <Button
            type="button"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button
            type="submit"
          >
            {formatAmount(amount)}원 결제하기
          </Button>
        </ButtonGroup>
      </form>
    </ProcessorContainer>
  );
}; 