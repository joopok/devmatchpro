import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../../store/store';

// API 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

// 단일 Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 401 에러 처리
    if (error.response?.status === 401) {
      // 토큰 만료 처리 로직
      store.dispatch({ type: 'auth/logout' });
    }
    
    return Promise.reject(error);
  }
);

// API 클라이언트 함수
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.get(url, config).then((res: AxiosResponse<T>) => res.data),
  
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.post(url, data, config).then((res: AxiosResponse<T>) => res.data),
  
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.put(url, data, config).then((res: AxiosResponse<T>) => res.data),
  
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.patch(url, data, config).then((res: AxiosResponse<T>) => res.data),
  
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.delete(url, config).then((res: AxiosResponse<T>) => res.data),
};

// API 서비스 구성
export const api = {
  auth: {
    login: (credentials: { email: string; password: string }) =>  apiClient.post('/auth/login', credentials),
    register: (userData: { email: string; password: string; name: string }) => apiClient.post('/auth/register', userData),
    logout: () => apiClient.post('/auth/logout'),
    getCurrentUser: () => apiClient.get('/auth/me'),
  },
  
  projects: {
    getAll: () => apiClient.get('/projects'),
    getById: (id: string) => apiClient.get(`/projects/${id}`),
    create: (project: any) => apiClient.post('/projects', project),
    update: (id: string, project: any) => apiClient.put(`/projects/${id}`, project),
    delete: (id: string) => apiClient.delete(`/projects/${id}`),
  },
  
  users: {
    getAll: () => apiClient.get('/users'),
    getById: (id: string) => apiClient.get(`/users/${id}`),
    update: (id: string, userData: any) => apiClient.put(`/users/${id}`, userData),
  },
  
  // 필요한 다른 API 서비스 추가
}; 