import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { Select } from '../../../common/Select';
import {
  FormContainer,
  FormTitle,
  FormGroup,
  ErrorMessage,
} from './SignUpForm.styles';
import { UserRole } from '../../../../types/user';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: UserRole;
}

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => Promise<void>;
  isLoading?: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch('password');

  return (
    <FormContainer>
      <FormTitle>회원가입</FormTitle>
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

        <FormGroup>
          <Input
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다',
              },
            })}
            type="password"
            label="비밀번호"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </FormGroup>

        <FormGroup>
          <Input
            {...register('confirmPassword', {
              required: '비밀번호를 다시 입력해주세요',
              validate: value =>
                value === password || '비밀번호가 일치하지 않습니다',
            })}
            type="password"
            label="비밀번호 확인"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </FormGroup>

        <FormGroup>
          <Input
            {...register('name', {
              required: '이름을 입력해주세요',
            })}
            label="이름"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </FormGroup>

        <FormGroup>
          <Select
            {...register('role')}
            value={watch('role')}
            options={[
              { value: 'DEVELOPER', label: '개발자' },
              { value: 'CLIENT', label: '클라이언트' }
            ]}
            onChange={(value) => {
              setValue('role', value as UserRole);
            }}
            label="회원 유형"
            error={!!errors.role}
            helperText={errors.role?.message}
          />
        </FormGroup>

        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? '가입 중...' : '가입하기'}
        </Button>
      </form>
    </FormContainer>
  );
}; 