import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api/axios';
import type { AuthUser } from '../../types/user';

// 로컬 스토리지 키 상수 정의
export const STORAGE_KEYS = {
  TOKEN: 'access_token',
  USER: 'auth_user'
} as const;

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null'),
  token: localStorage.getItem(STORAGE_KEYS.TOKEN),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload);
        api.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
      } else {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        delete api.defaults.headers.common['Authorization'];
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      delete api.defaults.headers.common['Authorization'];
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer; 