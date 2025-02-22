import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { authApi } from '../services/api/auth';
import { setUser, setToken, logout } from '../store/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (!savedToken) return;

      try {
        const { data: currentUser } = await authApi.getCurrentUser();
        dispatch(setUser(currentUser));
        dispatch(setToken(savedToken));
      } catch (error) {
        dispatch(logout());
      }
    };

    if (!user && !isLoading) {
      checkAuth();
    }
  }, [dispatch, user, isLoading]);

  return { 
    user, 
    token, 
    isLoading,
    isAuthenticated: !!user && !!token 
  };
}; 