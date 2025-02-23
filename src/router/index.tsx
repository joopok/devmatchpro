import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Layout } from '../pages/layout/Layout';
import { PrivateRoute } from './PrivateRoute';
import { projectApi } from '../services/api/project';

const Home = React.lazy(() => import('../pages/Home/Home'));
const Projects = React.lazy(() => import('../pages/Projects'));
const Analytics = React.lazy(() => import('../pages/Analytics'));
const Users = React.lazy(() => import('../pages/Users'));
const Calendar = React.lazy(() => import('../pages/Calendar'));
const Documents = React.lazy(() => import('../pages/Documents'));
const Settings = React.lazy(() => import('../pages/Settings'));
const ProjectList = React.lazy(() => import('../pages/Projects/ProjectList'));
const ProjectDetail = React.lazy(() => import('../pages/Projects/ProjectDetail'));
const TeamList = React.lazy(() => import('../pages/Teams/TeamList'));
const TeamDetail = React.lazy(() => import('../pages/Teams/TeamDetail'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const Profile = React.lazy(() => import('../pages/auth/Profile'));

const PageLoading = () => <div>페이지 로딩중...</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Analytics />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: 'calendar',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Calendar />
          </Suspense>
        ),
      },
      {
        path: 'documents',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Documents />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<PageLoading />}>
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
          <Suspense fallback={<PageLoading />}>
            <PrivateRoute>
              <ProjectDetail />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: 'teams',
        element: (
          <Suspense fallback={<PageLoading />}>
            <PrivateRoute>
              <TeamList />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: 'teams/:id',
        element: (
          <Suspense fallback={<PageLoading />}>
            <PrivateRoute>
              <TeamDetail />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<PageLoading />}>
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<PageLoading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<PageLoading />}>
        <Register />
      </Suspense>
    ),
  },
]); 