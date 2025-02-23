import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/common/TextField';
import { postRequest } from '../../services/api/axios';
import { 
  LoginContainer, 
  LoginCard, 
  Form, 
  LoginButton, 
  LoginFooter, 
  StyledLink, 
  RememberMeWrapper,
  LoginBackground,
  LoginContent,
  LoginLogo,
  LoginDescription,
  LoginFormWrapper,
  SocialButtons,
  SocialButton,
  OrDivider,
  TestimonialContent
} from './Login.styles';
import axios from 'axios';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setValue('username', savedUsername);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    
    try {
      if (data.rememberMe) {
        localStorage.setItem('savedUsername', data.username);
      } else {
        localStorage.removeItem('savedUsername');
      }

      const response = await postRequest('/auth/login', {
        username: data.username,
        password: data.password
      });

      let access_token, username;
      if (response.data) {
        ({ access_token, username } = response.data);
      } else if (response.data.access_token && response.data.username) {
        ({ access_token, username } = response.data);
      } else {
        throw new Error('토큰 또는 사용자 정보가 응답에 없음');
      }
      
      if (!access_token || !username) throw new Error('토큰 또는 유저 데이터가 undefined임');
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(username));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 실패: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <LoginContainer>
      <LoginBackground>
        <TestimonialContent>
          <h2>"</h2>
          <p>This template was just what we were after; its modern, works perfectly and is visually beautiful, we couldn't be happier.</p>
          <div className="author">— Richard, AppStack User</div>
        </TestimonialContent>
      </LoginBackground>
      
      <LoginContent>
        <LoginLogo src="/assets/img/logo.svg" alt="Logo" />
        <LoginDescription>
          <h1>Welcome back!</h1>
          <p>Sign in to your account to continue</p>
        </LoginDescription>

        <LoginCard>
          <LoginFormWrapper>
            <SocialButtons>
              <SocialButton $provider="facebook">
                Continue with Facebook
              </SocialButton>
              <SocialButton $provider="google">
                Continue with Google
              </SocialButton>
              <SocialButton $provider="apple">
                Continue with Apple
              </SocialButton>
            </SocialButtons>

            <OrDivider>
              <span>OR</span>
            </OrDivider>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                placeholder="Enter your email"
                {...register('username', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.username?.message}
              />
              
              <TextField
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 4,
                    message: 'Password must be at least 4 characters'
                  }
                })}
                error={errors.password?.message}
              />

              <RememberMeWrapper>
                <label>
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                  />
                  <span>Remember me</span>
                </label>
                <StyledLink to="/forgot-password">Forgot password?</StyledLink>
              </RememberMeWrapper>

              <LoginButton 
                type="submit"
                disabled={isSubmitting}
                $fullWidth
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </LoginButton>
            </Form>

            <LoginFooter>
              <p>
                Don't have an account? <StyledLink to="/register">Sign up</StyledLink>
              </p>
            </LoginFooter>
          </LoginFormWrapper>
        </LoginCard>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;