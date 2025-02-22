import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import {
  FormContainer,
  FormTitle,
  FormGroup,
  SuccessMessage,
} from './PasswordResetForm.styles';

interface PasswordResetFormData {
  email: string;
}

interface PasswordResetFormProps {
  onSubmit: (data: PasswordResetFormData) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  onSubmit,
  isLoading = false,
  isSuccess = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>();

  return (
    <FormContainer>
      <FormTitle>비밀번호 재설정</FormTitle>
      {isSuccess ? (
        <SuccessMessage>
          비밀번호 재설정 링크가 이메일로 전송되었습니다.
          이메일을 확인해주세요.
        </SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식이 아닙니다',
                },
              })}
              type="email"
              label="이메일"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FormGroup>

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? '처리 중...' : '재설정 링크 받기'}
          </Button>
        </form>
      )}
    </FormContainer>
  );
}; 