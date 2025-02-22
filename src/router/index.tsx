import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PrivateRoute } from './PrivateRoute';
import { projectApi } from '../api/project';

const ProjectList = React.lazy(() => import('../pages/projects/ProjectList'));
const ProjectDetail = React.lazy(() => import('../pages/projects/ProjectDetail'));
const TeamList = React.lazy(() => import('../pages/teams/TeamList'));
const TeamDetail = React.lazy(() => import('../pages/teams/TeamDetail'));
const Settings = React.lazy(() => import('../pages/settings/Settings'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'projects',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <ProjectList />
          </Suspense>
        ),
        loader: async () => {
          try {
            return await projectApi.getProjects();
          } catch (error) {
            console.error('Failed to load projects:', error);
            return [];
          }
        }
      },
      {
        path: 'projects/:id',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <PrivateRoute>
              <ProjectDetail />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: 'teams',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <PrivateRoute>
              <TeamList />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: 'teams/:id',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <PrivateRoute>
              <TeamDetail />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>로딩중...</div>}>
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
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
]); 