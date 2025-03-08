import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/api/auth';
import { setUser, setToken, setLoading, setError, STORAGE_KEYS } from './authSlice';
import type { User } from '../../types/user';
import type { RootState } from '../store';

interface AuthResponse {
  user: User;
  token: string;
}

interface SignupRequest {
  email: string;
  password: string;
  username1: string;
  username: string;
  role: 'DEVELOPER' | 'CLIENT';
}

export const login = createAsyncThunk<
  User,
  { username1: string; password: string }
>('auth/login', async (credentials, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    const { data } = await authApi.login(credentials);
    
    // 로컬 스토리지에 저장
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    
    // Redux store에 저장
    dispatch(setUser(data.user));
    dispatch(setToken(data.token));
    
    return data.user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다';
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
});

export const signup = createAsyncThunk<
  User,
  SignupRequest,
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