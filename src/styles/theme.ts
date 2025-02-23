export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
  gray: {
    [key: number]: string;
  };
  text: string;
  textSecondary: string;
  background: string;
  surface: string;
  border: string;
  sidebar: string;
  sidebarText: string;
  backgroundHover: string;
}

export interface Theme {
  colors: ThemeColors;
  isDarkMode: boolean;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
    h1: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    h2: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    h3: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    body1: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    body2: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
    caption: {
      fontSize: string;
      fontWeight: number;
      lineHeight: number;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: number;
}

const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    return prefersDark;
  }
  return savedTheme === 'dark';
};

export const theme = {
  colors: {
    primary: '#0066ff',
    primaryDark: '#0052cc',
    secondary: '#6c757d',
    secondaryDark: '#5a6268',
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
    surface: '#ffffff',
    border: '#dee2e6',
    sidebar: '#343a40',
    sidebarText: '#ffffff',
    backgroundHover: '#e2e6ea',
  },
  isDarkMode: getInitialTheme(),
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  typography: {
    fontFamily: "'Noto Sans KR', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '16px',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.05)',
  },
  borderRadius: 8,
} as const;

export type ThemeType = typeof theme;

export default theme;