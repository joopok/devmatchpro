import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/common/TextField';
import { postRequest } from '../../services/api/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../store/auth/authSlice';
import { AppDispatch } from '../../store/store';
import { useAuth } from '../../hooks/useAuth';
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

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
  email: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setValue('username', savedUsername);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Remember me 기능
      if (data.rememberMe) {
        localStorage.setItem('savedUsername', data.username);
      } else {
        localStorage.removeItem('savedUsername');
      }

      const response = await postRequest('/auth/login', {
        username: data.username,
        password: data.password,
        email: data.email
      });

      if (response.data && response.data.access_token) {
        const { access_token, username, email, ...userInfo } = response.data;
        
        // Redux store에 사용자 정보 저장
        dispatch(setUser({
          id: userInfo.id,
          username,
          email,
          name: userInfo.name,
          role: userInfo.role,
          bio: userInfo.bio,
          githubUrl: userInfo.githubUrl,
          portfolioUrl: userInfo.portfolioUrl,
          createdAt: userInfo.createdAt,
          updatedAt: userInfo.updatedAt,
        }));
        
        // Redux store에 토큰 저장
        dispatch(setToken(access_token));
        
        // 홈으로 리다이렉트
        navigate('/', { replace: true });
      } else {
        throw new Error('토큰 또는 사용자 정보가 응답에 없습니다.');
      }
      
    } catch (error) {
      console.error('로그인 오류:', error);
      // 에러 메시지를 사용자에게 표시
      alert('로그인 실패: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  // 이미 로그인된 상태라면 로딩 표시
  if (isAuthenticated) {
    return <div>리다이렉트 중...</div>;
  }

  return (
    <LoginContainer>
      <LoginBackground>
        <TestimonialContent>
          <h2>"</h2>
          <p>이 템플릿은 우리가 원하던 그대로였습니다. 현대적이고 완벽하게 작동하며, 시각적으로도 아름답습니다. 더할 나위 없이 만족합니다.</p>
          <div className="author">— 개발자, 도승현</div>
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
                label="아이디"
                placeholder="아이디를 입력하세요."
                {...register('username', {
                  required: '아이디를 입력해주세요',
                  pattern: {
                    value: /^[a-z0-9]{4,20}$/,
                    message: '아이디는 4-20자의 영문 소문자, 숫자만 사용 가능합니다'
                  }
                })}
                error={errors.username?.message}
              />
              
              <TextField
                label="비밀번호" 
                type="password"
                placeholder="비밀번호를 입력하세요."
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
                    //value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
                    message: '비밀번호는 4자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다'
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