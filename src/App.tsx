import React, { Suspense } from 'react';

import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { useSelector } from 'react-redux';
import baseTheme, { Theme } from './styles/theme';
import { RootState } from './store/store';
import GlobalStyle from './styles/GlobalStyle';
import { router } from './router';
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary';
import './reset.css';
import './styles/fonts.css';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    로딩 중...
  </div>
);

const App: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const theme: Theme = {
    ...baseTheme,
    isDarkMode,
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
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