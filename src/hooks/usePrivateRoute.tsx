import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

// PrivateRoute 컴포넌트는 그대로 유지하되, usePrivateRoute 훅을 통해 사용할 수 있게 합니다.
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>로딩 중...</div>; // 또는 로딩 컴포넌트
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// usePrivateRoute 훅 추가
export const usePrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  return {
    isAuthenticated,
    isLoading,
    loginRedirect: <Navigate to="/auth/login" state={{ from: location }} replace />,
  };
}; 