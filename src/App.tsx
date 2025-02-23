import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { useSelector } from 'react-redux';
import baseTheme from './styles/theme';
import { RootState } from './store/store';
import GlobalStyle from './styles/GlobalStyle';
import { router } from './router';
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary';
import './styles/fonts.css';
import { Layout } from './components/layout/Layout';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    로딩 중...
  </div>
);

const App: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const currentTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#0066ff',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      light: '#f8f9fa',
      dark: '#343a40',
      gray: {
        50: '#f8f9fa',
        100: '#e9ecef',
        200: '#dee2e6',
        300: '#ced4da',
        400: '#adb5bd',
        500: '#6c757d',
        600: '#495057',
        700: '#343a40',
        800: '#212529',
        900: '#1a1a1a',
      },
      text: '#212529',
      textSecondary: '#6c757d',
      background: '#ffffff',
      border: '#dee2e6',
      sidebar: '#343a40',
      sidebarText: '#ffffff',
      backgroundHover: '#e2e6ea',
    },
    isDarkMode,
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle theme={currentTheme} />
        <ToastProvider>
          <Suspense fallback={<LoadingFallback />}>
            <RouterProvider router={router} />
          </Suspense>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;