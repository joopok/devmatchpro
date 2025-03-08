import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import { AuthLayout, ErrorMessage } from './Login.styles';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormData>();
  const password = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setRegisterError(null);
      
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username1: data.name,
          email: data.email,
          password: data.password,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입에 실패했습니다.');
      }
      
      navigate('/login');
    } catch (error: any) {
      console.error('회원가입 오류:', error);
      if (error instanceof Error) {
        setRegisterError(error.message);
      } else {
        setRegisterError('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        
        {registerError && (
          <ErrorMessage>
            {registerError}
          </ErrorMessage>
        )}
        
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
            type="text"
            label="이름"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </FormGroup>
        <Button type="submit" fullWidth>
          가입하기
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Register;