import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { User } from '../types/user';

interface AuthUser extends User {
  profileImage?: string;
  role: 'ADMIN' | 'DEVELOPER' | 'CLIENT';
}

export const useAuth = () => {
  const { user, isLoading, error } = useSelector((state: RootState) => state.auth);
  
  return {
    user: user as AuthUser,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}; 