import React from 'react';
import { ThemeConfigurator } from '../../components/Project/settings/ThemeConfigurator/ThemeConfigurator';
import type { ThemeConfig } from '../../types/theme';

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#007AFF',
    primaryDark: '#0056b3',
    secondary: '#5856D6',
    secondaryDark: '#4240ac',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#6c757d',
    border: '#E5E5EA',
    error: '#FF3B30',
    errorDark: '#bd2130',
    success: '#34C759',
    warning: '#FF9500',
    info: '#32ADE6',
    backgroundHover: '#F2F2F7',
    sidebar: '#F9F9F9',
    sidebarText: '#000000'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700
    },
    lineHeight: 1.5,
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    base: '16px',
    containerPadding: 24
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.05)'
  },
  borderRadius: 8,
  isDark: false
};

const Settings: React.FC = () => {
  const handleSave = async (config: ThemeConfig) => {
    console.log('Saving theme config:', config);
  };

  return (
    <div>
      <h1>설정</h1>
      <ThemeConfigurator 
        initialConfig={defaultTheme}
        onSave={handleSave}
        onPreview={(config: ThemeConfig) => console.log('Preview:', config)}
        onReset={() => console.log('Reset theme')}
        isLoading={false}
      />
    </div>
  );
};

export default Settings; 