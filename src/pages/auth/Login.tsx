import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/common/TextField';
import { postRequest } from '../../services/api/axios';
import { LoginContainer, LoginCard, LoginHeader, Form, LoginButton, LoginFooter, StyledLink } from './Login.styles';

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log("data::::", data);
    try {
      const response = await postRequest('/auth/login', { username: 'test1', password: 'test1' });
      //const response = await postRequest('/auth/login', { username: data.username, password: data.password });
        console.log('응답 데이터:', response);
      } catch (error) {
        console.error('에러 발생:', error);
      }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <h2>로그인</h2>
          <p>계정에 로그인하세요</p>
        </LoginHeader>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="이메일"
            {...register('username', {
              required: '아이디를 입력하세요',
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //   message: '올바른 이메일 형식이 아닙니다'
              // }
            })}
            error={errors.username?.message}
            style={{
              color: errors.username ? '#ff0000' : '#000000'
            }}
          />
          
          <TextField
            label="비밀번호" 
            type="password"
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 4,
                message: '비밀번호는 8자 이상이어야 합니다'
              }
            })}
            error={errors.password?.message}
            style={{
              color: errors.password ? '#ff0000' : '#000000'
            }}
          />

          <LoginButton 
            type="submit"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </LoginButton>
        </Form>

        <LoginFooter>
          <p>
            계정이 없으신가요? <StyledLink to="/register">회원가입</StyledLink>
          </p>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;