import { api } from './axios';
import { User } from '../../types/user';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role: 'DEVELOPER' | 'CLIENT';
}

interface AuthResponse {
  user: User;
  token: string;
}

const DEMO_USER = {
  id: '1',
  email: 'demo@example.com',
  password: 'demo1234',
  name: '데모 사용자',
  role: 'DEVELOPER' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('로그인 시도:', credentials);

    if (credentials.email === DEMO_USER.email && credentials.password === DEMO_USER.password) {
      const { password, ...userWithoutPassword } = DEMO_USER;
      return {
        data: {
          user: userWithoutPassword,
          token: 'demo-token-' + Date.now(),
        },
      };
    }

    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  },
  
  signup: (data: SignupRequest) => 
    api.post<AuthResponse>('/auth/signup', data),
  
  getCurrentUser: () => 
    api.get<User>('/auth/me'),
  
  logout: () => 
    api.post('/auth/logout'),
}; 