import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../store/store';
import { authApi } from '../services/api/auth';
import { setUser, setToken, logout, STORAGE_KEYS } from '../store/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (!savedToken || !savedUser) {
          if (location.pathname !== '/login' && location.pathname !== '/register') {
            navigate('/login', { 
              replace: true,
              state: { from: location.pathname }
            });
          }
          return;
        }

        try {
          const { data: currentUser } = await authApi.getCurrentUser();
          dispatch(setUser(currentUser));
          dispatch(setToken(savedToken));

          // 로그인 페이지에 있다면 홈으로 리다이렉트
          if (location.pathname === '/login') {
            navigate('/', { replace: true });
          }
        } catch (error) {
          // 인증 에러 처리
          console.error('Auth validation failed:', error);
          dispatch(logout());
          navigate('/login', { 
            replace: true,
            state: { from: location.pathname }
          });
        }

      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch(logout());
        
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/login', { 
            replace: true,
            state: { from: location.pathname }
          });
        }
      }
    };

    checkAuth();
  }, [dispatch, navigate, location]);

  return {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(user && token)
  };
};