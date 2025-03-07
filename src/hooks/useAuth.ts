import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../store/store';
import { setUser, setToken } from '../store/slices/authSlice';
import axios from 'axios';

// 로컬 스토리지 키 정의
const STORAGE_KEYS = {
  TOKEN: 'devmatch_token',
  USER: 'devmatch_user'
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, isLoading } = useSelector((state: RootState) => state.auth);
  const initialized = useRef(false);

  // 인증 체크 함수 정의 (useEffect 외부로 분리)
  const checkAuth = useCallback(async () => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      
      // 이미 로그인 상태라면 추가 처리하지 않음
      if (user && token) return;
      
      // 토큰이 없는 경우
      if (!savedToken || !savedUser) {
        const currentPath = location.pathname;
        const isAuthPage = currentPath.includes('/auth/') || currentPath === '/login' || currentPath === '/register';
        
        // 인증 페이지가 아닐 경우만 리다이렉트
        if (!isAuthPage) {
          navigate('/auth/login', { replace: true });
        }
        return;
      }

      // 토큰이 있으면 유저 정보 가져오기
      try {
        const parsedUser = JSON.parse(savedUser);
        // 리덕스 스토어 업데이트
        dispatch(setUser(parsedUser));
        dispatch(setToken(savedToken));
        
        // axios 헤더에 토큰 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  }, [dispatch, location.pathname, navigate, token, user]);

  // 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(user && token)
  };
};