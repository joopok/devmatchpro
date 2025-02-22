import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth';
import { setUser, setToken, setLoading, setError } from './authSlice';
import type { User } from '../../types/user';
import type { RootState } from '../store';

interface AuthResponse {
  user: User;
  token: string;
}

export const login = createAsyncThunk<
  User,
  { email: string; password: string }
>('auth/login', async (credentials, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    console.log('로그인 요청:', credentials); // 디버깅용
    const { data } = await authApi.login(credentials);
    console.log('로그인 응답:', data); // 디버깅용
    
    dispatch(setUser(data.user));
    dispatch(setToken(data.token));
    
    return data.user;
  } catch (error) {
    console.error('로그인 에러:', error); // 디버깅용
    const errorMessage = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다';
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
});

export const signup = createAsyncThunk<
  User,
  { email: string; password: string; name: string; role: 'DEVELOPER' | 'CLIENT' },
  { state: RootState }
>('auth/signup', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const { data: response } = await authApi.signup(data);
    dispatch(setUser(response.user));
    dispatch(setToken(response.token));
    return response.user;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
}); 