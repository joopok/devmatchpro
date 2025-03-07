import { lazy, createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

// 페이지 컴포넌트 로드
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/auth/Profile'));
const Projects = lazy(() => import('../pages/Projects'));
const ProjectList = lazy(() => import('../pages/Projects/ProjectList'));
const ProjectDetail = lazy(() => import('../pages/Projects/ProjectDetail'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Users = lazy(() => import('../pages/Users'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Documents = lazy(() => import('../pages/Documents'));
const Settings = lazy(() => import('../pages/Settings'));
const TeamList = lazy(() => import('../pages/Teams/TeamList'));
const TeamDetail = lazy(() => import('../pages/Teams/TeamDetail'));
const Ecommerce = lazy(() => import('../pages/Ecommerce'));
const Chat = lazy(() => import('../pages/Chat'));
const TemplateViewer = lazy(() => import('../pages/TemplateViewer'));
const ChartGallery = lazy(() => import('../pages/ChartGallery'));

/**
 * 라우트 생성 헬퍼 함수
 * @param Component 렌더링할 컴포넌트
 * @param isPrivate 인증이 필요한지 여부
 * @returns 컴포넌트 요소
 */
const createRoute = (Component: React.ComponentType, isPrivate = false): React.ReactElement => {
  if (isPrivate) {
    return createElement(PrivateRoute, {
      children: createElement(Component)
    });
  }
  return createElement(Component);
};

/**
 * 애플리케이션 라우트 정의
 */
export const routes: RouteObject[] = [
  // 공개 라우트
  {
    path: '/',
    element: createRoute(Home),
  },
  {
    path: '/auth/login', 
    element: createRoute(Login),
  },
  {
    path: '/auth/register',
    element: createRoute(Register),
  },
  
  // 인증이 필요한 라우트
  {
    path: '/dashboard',
    element: createRoute(Dashboard, true),
  },
  {
    path: '/profile',
    element: createRoute(Profile, true),
  },
  {
    path: '/projects',
    element: createRoute(Projects, true),
  },
  {
    path: '/projects/list',
    element: createRoute(ProjectList, true),
  },
  {
    path: '/projects/:id',
    element: createRoute(ProjectDetail, true),
  },
  {
    path: '/analytics',
    element: createRoute(Analytics, true),
  },
  {
    path: '/users',
    element: createRoute(Users, true),
  },
  {
    path: '/calendar',
    element: createRoute(Calendar, true),
  },
  {
    path: '/documents',
    element: createRoute(Documents, true),
  },
  {
    path: '/settings',
    element: createRoute(Settings, true),
  },
  {
    path: '/teams',
    element: createRoute(TeamList, true),
  },
  {
    path: '/teams/:id',
    element: createRoute(TeamDetail, true),
  },
  {
    path: '/ecommerce',
    element: createRoute(Ecommerce, true),
  },
  {
    path: '/chat',
    element: createRoute(Chat, true),
  },
  {
    path: '/templates',
    element: createRoute(TemplateViewer, true),
  },
  {
    path: '/charts',
    element: createRoute(ChartGallery, true),
  }
]; 