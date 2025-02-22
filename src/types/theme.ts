export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  errorDark: string;
  success: string;
  warning: string;
  info: string;
  backgroundHover: string;
  sidebar: string;
  sidebarText: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  base: string;
  containerPadding: number;
}

export interface ThemeBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

export interface ThemeTypography {
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
  lineHeight: number;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  caption: TextStyle;
}

interface TextStyle {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
}

export interface ThemeConfig extends Theme {
  isDark: boolean;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
  typography: ThemeTypography;
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: number;
} 