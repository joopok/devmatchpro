import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/TextField';
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
  TestimonialContent,
  AuthLayout,
  ErrorMessage
} from './Login.styles';  


interface LoginFormData {
  username1: string;
  password: string;
  rememberMe: boolean;
  email: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  // 폼 에러가 변경될 때마다 state에 저장
  useEffect(() => {
    if (errors.username1?.message) {
      setUsernameError(errors.username1.message);
    } else {
      setUsernameError(null);
    }

    if (errors.password?.message) {
      setPasswordError(errors.password.message);
    } else {
      setPasswordError(null);
    }
  }, [errors.username1, errors.password]);

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const savedUsername1 = localStorage.getItem('savedUsername1');
    if (savedUsername1) {
      setValue('username1', savedUsername1);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError(null); // 제출 시 이전 오류 메시지 초기화
      setUsernameError(null);
      setPasswordError(null);
      
      // Remember me 기능
      if (data.rememberMe) {
        localStorage.setItem('savedUsername1', data.username1);
      } else {
        localStorage.removeItem('savedUsername1');
      }

      const response = await postRequest('/auth/login', {
        username1: data.username1,
        password: data.password,
        email: data.email
      });

      if (response.data && response.data.access_token) {
        const { access_token, username,username1, email, ...userInfo } = response.data;
        
        // 사용자 데이터 구성
        const userData = {
          id: userInfo.id,
          username,
          username1,
          email,
          name: userInfo.name,
          role: userInfo.role,
          bio: userInfo.bio,
          githubUrl: userInfo.githubUrl,
          portfolioUrl: userInfo.portfolioUrl,
          createdAt: userInfo.createdAt,
          updatedAt: userInfo.updatedAt,
        };
        
        // Redux store에 사용자 정보 저장
        dispatch(setUser(userData));
        
        // Redux store에 토큰 저장
        dispatch(setToken(access_token));
        
        // localStorage에 사용자 정보와 토큰 저장
        localStorage.setItem('devmatch_token', access_token);
        localStorage.setItem('devmatch_user', JSON.stringify(userData));
        
        // 홈으로 리다이렉트
        navigate('/', { replace: true });
      } else {
        setLoginError('로그인에 실패했습니다. 토큰 또는 사용자 정보가 응답에 없습니다.');
      }
      
    } catch (error: any) {
      console.error('로그인 오류:', error);
      // 오류 메시지 설정
      if (error.response?.data?.message) {
        // 특정 필드 오류인지 확인
        if (error.response.data.field === 'username1') {
          setUsernameError(error.response.data.message);
        } else if (error.response.data.field === 'password') {
          setPasswordError(error.response.data.message);
        } else {
          setLoginError(error.response.data.message);
        }
      } else if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  // 이미 로그인된 상태라면 로딩 표시
  if (isAuthenticated) {
    return <div>리다이렉트 중...</div>;
  }

  return (
    <AuthLayout>
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
                  Facebook
                </SocialButton>
                <SocialButton $provider="google">
                  Google
                </SocialButton>
                <SocialButton $provider="apple">
                  Apple
                </SocialButton>
              </SocialButtons>

              <OrDivider>
                <span>OR</span>
              </OrDivider>

              <div onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // 엔터키 입력 시 로그인 버튼 클릭 함수 실행
                  document.getElementById('login-button')?.click();
                }
              }}>
                {/* 로그인 오류 메시지 표시 */}
                {loginError && (
                  <ErrorMessage>
                    {loginError}
                  </ErrorMessage>
                )}
                
                <TextField
                  label="아이디"
                  placeholder="아이디를 입력하세요."
                  {...register('username1', {
                    required: '아이디를 입력해주세요',
                    pattern: {
                      value: /^[a-z0-9]{4,20}$/,
                      message: '아이디는 4-20자의 영문 소문자, 숫자만 사용 가능합니다'
                    }
                  })}
                  error={!!usernameError}
                  helperText={usernameError || undefined}
                  style={{ 
                    color: '#000',
                    borderColor: usernameError ? '#dc3545' : undefined
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                />
                
                <div style={{ position: 'relative', marginTop: '10px' }}>
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
                    error={!!passwordError}
                    helperText={passwordError || undefined}
                    style={{ 
                      color: '#000',
                      borderColor: passwordError ? '#dc3545' : undefined
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>

                <RememberMeWrapper style = {{ position: 'relative', marginTop: '20px' }} >
                  <label>
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                    />
                    <span style={{ color: '#000' }}>Remember me</span>
                  </label>
                  <StyledLink to="/forgot-password">Forgot password?</StyledLink>
                </RememberMeWrapper>

                <LoginButton 
                  id="login-button"
                  type="button" 
                  disabled={isSubmitting}
                  $fullWidth
                  onClick={async () => {
                    // 폼 유효성 검사 실행
                    const isValid = await trigger();
                    if (!isValid) {
                      console.log('폼 유효성 검사 실패');
                      return;
                    }
                    
                    // 폼 데이터 가져오기
                    const formData = getValues();
                    console.log('폼 데이터:', formData);
                    
                    try {
                      setLoginError(null);
                      setUsernameError(null);
                      setPasswordError(null);
                      
                      // Remember me 기능
                      if (formData.rememberMe) {
                        localStorage.setItem('savedUsername1', formData.username1);
                      } else {
                        localStorage.removeItem('savedUsername1');
                      }

                      console.log('로그인 요청 시작...');
                      // 로그인 API 호출
                      const response = await postRequest('/auth/login', {
                        username1: formData.username1,
                        password: formData.password,
                        // email 필드가 필요하지 않다면 제거
                        // email: formData.email 
                      });

                      console.log('로그인 응답:', response);

                      // axios 응답 확인 및 데이터 접근
                      if (response && response.data && response.data.access_token) {
                        console.log('토큰 확인됨:', response.data.access_token);
                        const { access_token, username, username1, email, ...userInfo } = response.data;
                        
                        // 필수 정보가 있는지 확인
                        if (!access_token || !userInfo) {
                          console.error('필수 정보 누락:', { access_token, userInfo });
                          setLoginError('로그인에 필요한 정보가 부족합니다.');
                          return;
                        }
                        
                        // 사용자 데이터 구성
                        const userData = {
                          id: userInfo.id,
                          username: username || '',
                          username1: username1 || '',
                          email: email || '',
                          name: userInfo.name || '',
                          role: userInfo.role || '',
                          bio: userInfo.bio || '',
                          githubUrl: userInfo.githubUrl || '',
                          portfolioUrl: userInfo.portfolioUrl || '',
                          createdAt: userInfo.createdAt || '',
                          updatedAt: userInfo.updatedAt || '',
                        };
                        
                        console.log('유저 데이터 구성 완료:', userData);
                        
                        // 로그인 성공 시에만 Redux 및 로컬 스토리지에 정보 저장
                        try {
                          // Redux store에 사용자 정보 저장
                          dispatch(setUser(userData));
                          
                          // Redux store에 토큰 저장
                          dispatch(setToken(access_token));
                          
                          // localStorage에 사용자 정보와 토큰 저장
                          localStorage.setItem('devmatch_token', access_token);
                          localStorage.setItem('devmatch_user', JSON.stringify(userData));
                          
                          console.log('로그인 성공, 리다이렉트 중...');
                          // 홈으로 리다이렉트
                          navigate('/', { replace: true });
                        } catch (storageError) {
                          console.error('데이터 저장 오류:', storageError);
                          setLoginError('로그인 정보 저장 중 오류가 발생했습니다.');
                        }
                      } else {
                        console.error('로그인 실패, 응답 데이터:', response?.data);
                        // 로그인 실패 - 저장 안함
                        setLoginError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
                      }
                      
                    } catch (error: any) {
                      console.error('로그인 오류:', error);
                      console.error('오류 상세:', error.response?.data);
                      
                      // 오류 메시지 설정
                      if (error.response?.data?.message) {
                        // 특정 필드 오류인지 확인
                        if (error.response.data.field === 'username1') {
                          setUsernameError(error.response.data.message);
                        } else if (error.response.data.field === 'password') {
                          setPasswordError(error.response.data.message);
                        } else {
                          setLoginError(error.response.data.message);
                        }
                      } else if (error instanceof Error) {
                        setLoginError(error.message);
                      } else {
                        setLoginError('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
                      }
                      
                      // 로그인 실패 시 이전에 저장된 데이터도 삭제
                      localStorage.removeItem('devmatch_token');
                      localStorage.removeItem('devmatch_user');
                    }
                  }}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </LoginButton>
              </div>

              <LoginFooter>
                <p>
                  Don't have an account? <StyledLink to="/register">Sign up</StyledLink>
                </p>
              </LoginFooter>
            </LoginFormWrapper>
          </LoginCard>
        </LoginContent>
      </LoginContainer>
    </AuthLayout>
  );
};

export default Login;