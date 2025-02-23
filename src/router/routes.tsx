import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import Dashboard from '../pages/dashboard';
import { PrivateRoute } from '../components/auth/PrivateRoute';

const Home = React.lazy(() => import('../pages/Home'));
const Projects = React.lazy(() => import('../pages/projects/index'));
const ProjectDetail = React.lazy(() => import('../pages/projects/[id]'));
const Teams = React.lazy(() => import('../pages/teams/index'));
const TeamDetail = React.lazy(() => import('../pages/teams/[id]'));
const Chat = React.lazy(() => import('../pages/chat/index'));
const Analytics = React.lazy(() => import('../pages/analytics/index'));
const Settings = React.lazy(() => import('../pages/settings/index'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: 'projects/:id',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <ProjectDetail />
          </Suspense>
        ),
      },
      {
        path: 'teams',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <Teams />
          </Suspense>
        ),
      },
      {
        path: 'teams/:id',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <TeamDetail />
          </Suspense>
        ),
      },
      {
        path: 'chat',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <Chat />
          </Suspense>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <Analytics />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>로딩중...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<div>로딩중...</div>}>
        <Register />
      </Suspense>
    ),
  },
];

export { routes }; 