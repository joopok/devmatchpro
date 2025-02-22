import { User, AuthUser } from '../../types/user';

interface AuthResponse {
  user: User;
  token: string;
}

interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role: 'DEVELOPER' | 'CLIENT';
}

const DEMO_USER: AuthUser = {
  id: '1',
  email: 'demo@example.com',
  password: 'demo1234',
  name: '데모 사용자',
  role: 'DEVELOPER',
  bio: '안녕하세요, 데모 사용자입니다.',
  githubUrl: 'https://github.com',
  portfolioUrl: 'https://portfolio.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const authApi = {
  login: async (credentials: { email: string; password: string }): Promise<{ data: AuthResponse }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

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
  
  signup: async (data: SignupRequest): Promise<{ data: AuthResponse }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.email === DEMO_USER.email) {
      throw new Error('이미 사용중인 이메일입니다.');
    }

    const newUser: AuthUser = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { password, ...userWithoutPassword } = newUser;
    return {
      data: {
        user: userWithoutPassword,
        token: 'new-user-token-' + Date.now(),
      },
    };
  },
  
  getCurrentUser: async (): Promise<{ data: User }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('인증되지 않은 사용자입니다.');
    
    const { password, ...userWithoutPassword } = DEMO_USER;
    return { data: userWithoutPassword };
  },
  
  logout: async (): Promise<{ data: null }> => {
    localStorage.removeItem('token');
    return { data: null };
  },
}; 