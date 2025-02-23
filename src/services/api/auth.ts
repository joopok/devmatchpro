import { User, AuthUser, AuthResponse } from '../../types/user';
import { store } from '../../store/store';
import axios from 'axios';
import { STORAGE_KEYS } from '../../store/auth/authSlice';

interface SignupRequest {
  email: string;
  password: string;
  username: string;
  role: 'DEVELOPER' | 'CLIENT';
}

// Redux store에서 현재 인증 상태 확인
const getAuthState = () => {
  const state = store.getState();
  return state.auth;
};

// 사용하지 않는 함수 제거 또는 실제로 사용한다면 주석 추가
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validateSession = (): boolean => {
  const { user, token } = getAuthState();
  return !!(user && token);
};

export const authApi = {
  login: async (credentials: { username: string; password: string }): Promise<{ data: AuthResponse }> => {
    try {
      // API 호출 전 기존 토큰 확인
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post('/api/auth/login', credentials);
      
      // 응답 데이터 구조 통일
      const userData: User = {
        id: response.data.user.id,
        username: response.data.user.username || response.data.user.email,
        email: response.data.user.email,
        role: response.data.user.role || 'USER',
        name: response.data.user.name,
        bio: response.data.user.bio,
        githubUrl: response.data.user.githubUrl,
        portfolioUrl: response.data.user.portfolioUrl,
        avatar: response.data.user.avatar,
        profileImage: response.data.user.profileImage,
        createdAt: response.data.user.createdAt,
        updatedAt: response.data.user.updatedAt,
      };

      // 토큰 저장 및 헤더 설정
      const accessToken = response.data.access_token || response.data.token;
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }

      return {
        data: {
          user: userData,
          token: accessToken,
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('로그인 실패');
    }
  },
  
  signup: async (data: SignupRequest): Promise<{ data: AuthResponse }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { user } = getAuthState();
    // 이미 로그인된 사용자가 있는지 확인
    if (user && user.email === data.email) {
      throw new Error('이미 사용중인 이메일입니다.');
    }

    const newUser: AuthUser = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      username: data.username,
      role: data.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { password, ...userWithoutPassword } = newUser;
    const token = 'auth-token-' + Date.now();

    return {
      data: {
        user: userWithoutPassword,
        token,
      },
    };
  },
  
  getCurrentUser: async (): Promise<{ data: AuthUser }> => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      
      if (!token || !savedUser) {
        throw new Error('인증되지 않은 사용자입니다.');
      }

      // API 호출 대신 저장된 사용자 정보 사용
      const user = JSON.parse(savedUser);
      
      // 토큰 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { 
        data: {
          ...user,
          // 민감한 정보 제거
          password: undefined
        }
      };

      // 실제 API가 준비되면 아래 코드로 변경
      /*
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { data: response.data };
      */
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },
  
  logout: async (): Promise<{ data: null }> => {
    // 실제 로그아웃은 Redux action을 통해 처리됨
    return { data: null };
  },
}; 