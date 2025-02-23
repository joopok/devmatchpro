import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks';
import { useForm } from 'react-hook-form';
import { login } from '../../../../store/auth/authThunks';
import { TextField } from '../../../common/TextField';
import { Button } from '../../../common/Button';
import styled from 'styled-components';

interface LoginFormData {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('로그인 시도:', data); // 디버깅용
      const result = await dispatch(login(data)).unwrap(); // unwrap() 추가
      console.log('로그인 성공:', result); // 디버깅용
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error); // 디버깅용
      setError('root', {
        type: 'manual',
        message: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
      });
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>로그인</FormTitle>
        
        <InputGroup>
          <TextField
            label="아이디"
            {...register('username', {
              required: '아이디를 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다',
              },
            })}
            error={errors.username?.message}
          />
        </InputGroup>

        <InputGroup>
          <TextField
            label="비밀번호"
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
            })}
            error={errors.password?.message}
          />
        </InputGroup>

        {errors.root && (
          <ErrorMessage>{errors.root.message}</ErrorMessage>
        )}

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>

        <RegisterButton type="button" variant="text" onClick={() => navigate('/register')}>
          계정이 없으신가요? 회원가입
        </RegisterButton>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  margin-bottom: 24px;
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 16px;
  font-size: 14px;
`;

const RegisterButton = styled(Button)`
  width: 100%;
`; 