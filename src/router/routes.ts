import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../components/auth/PrivateRoute';
import { createElement } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/auth/Profile'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: createElement(Home),
  },
  {
    path: '/login', 
    element: createElement(Login),
  },
  {
    path: '/register',
    element: createElement(Register),
  },
  {
    path: '/dashboard',
    element: createElement(PrivateRoute, {
      children: createElement(Dashboard),
    }),
  },
  // 다른 보호된 라우트들
  {
    path: '/profile',
    element: createElement(PrivateRoute, {
      children: createElement(Profile),
    }),
  },
];