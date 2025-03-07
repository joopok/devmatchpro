import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { Layout } from '../pages/layout';
import { PrivateRoute } from './PrivateRoute';
import { routes } from './routes';

// 로딩 컴포넌트
const PageLoading: React.FC = () => {
  return <div>페이지 로딩중...</div>;
};

/**
 * Suspense로 컴포넌트를 감싸는 HOC
 */
const withSuspense = (Component: React.LazyExoticComponent<any>): React.ReactElement => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Component />
    </Suspense>
  );
};

/**
 * 인증이 필요한 컴포넌트를 위한 HOC
 */
const withPrivate = (Component: React.LazyExoticComponent<any>): React.ReactElement => {
  return (
    <PrivateRoute>
      {withSuspense(Component)}
    </PrivateRoute>
  );
};

/**
 * 라우터 설정
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: routes,
  },
  {
    path: 'auth',
    children: [
      { path: 'login', element: withSuspense(React.lazy(() => import('../pages/auth/Login'))) },
      { path: 'register', element: withSuspense(React.lazy(() => import('../pages/auth/Register'))) },
    ],
  },
  {
    path: 'login',
    element: <Navigate to="/auth/login" replace />
  },
  {
    path: 'register',
    element: <Navigate to="/auth/register" replace />
  },
]);