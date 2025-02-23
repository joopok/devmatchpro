import { lazy, createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../components/auth/PrivateRoute';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const Profile = lazy(() => import('../pages/auth/Profile'));

// 헬퍼 함수 수정
const createRoute = (Component: React.ComponentType, isPrivate = false): React.ReactElement => {
  if (isPrivate) {
    return createElement(PrivateRoute, {
      children: createElement(Component)
    });
  }
  return createElement(Component);
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: createRoute(Home, true),
  },
  {
    path: '/home',
    element: createRoute(Home),
  },
  {
    path: '/login',
    element: createRoute(Login),
  },
  {
    path: '/register',
    element: createRoute(Register),
  },
  {
    path: '/dashboard',
    element: createRoute(Dashboard, true),
  },
  {
    path: '/profile',
    element: createRoute(Profile, true),
  },
]; 