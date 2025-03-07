import React, { Suspense, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { useSelector } from 'react-redux';
import baseTheme from './styles/theme';
import { RootState } from './store/store';
import GlobalStyle from './styles/GlobalStyle';
import { router } from './router';
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary';
import './App.css';
import './styles/fonts.css';
import './styles/bootstrap-variables.css';
import './styles/bootstrap-utilities.css';
import './styles/custom.css';

import { ThemeProvider } from './contexts/ThemeContext';
import { BootstrapProvider } from './contexts/BootstrapContext';
import SettingsPanel from './components/common/settings/SettingsPanel';
import { initCSSVariables } from './utils/cssVariables';
import { initBootstrap } from './utils/bootstrap';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    로딩 중...
  </div>
);

const App: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = { ...baseTheme, isDarkMode };

  // CSS 변수와 Bootstrap 초기화
  useEffect(() => {
    initCSSVariables();
    initBootstrap();
  }, []);

  return (
    <ErrorBoundary>
      <BootstrapProvider>
        <ThemeProvider>
          <StyledThemeProvider theme={theme}>
            <GlobalStyle theme={theme} />
            <ToastProvider>
              <Suspense fallback={<LoadingFallback />}>
                <RouterProvider router={router} />
                <SettingsPanel />
              </Suspense>
            </ToastProvider>
          </StyledThemeProvider>
        </ThemeProvider>
      </BootstrapProvider>
    </ErrorBoundary>
  );
};

export default App;