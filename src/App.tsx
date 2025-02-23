import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { useSelector } from 'react-redux';
import theme from './styles/theme';
import { RootState } from './store/store';
import GlobalStyle from './styles/GlobalStyle';
import { routes } from './router/routes';
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary';
import './styles/fonts.css';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    로딩 중...
  </div>
);

const App: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  // 다크모드 테마는 기본 테마를 기반으로 색상만 오버라이드
  const currentTheme = isDarkMode
    ? {
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#0A84FF',
          background: '#1A1A1A',
          surface: '#2C2C2C',
          text: '#FFFFFF',
          textSecondary: '#A0A0A0',
          border: '#404040',
          error: '#FF453A',
          success: '#32D74B',
          warning: '#FFD60A',
          info: '#64D2FF',
          backgroundHover: '#363636',
          sidebar: '#2C2C2C',
        },
      }
    : theme;

  const browserRouter = createBrowserRouter(routes, {
    future: {
      v7_normalizeFormMethod: true,
    },
  });

  return (
    <ErrorBoundary>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle theme={currentTheme} />
        <ToastProvider>
          <Suspense fallback={<LoadingFallback />}>
            <RouterProvider router={browserRouter} />
          </Suspense>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;