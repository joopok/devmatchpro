import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none !important;
  }

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: 1.5;
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.colors.text};
    background-color: ${({ theme }) => theme.isDarkMode ? '#202634' : '#fff'};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    transition: all 0.3s ease;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6, p, span {
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : theme.colors.text};
  }

  h1, h2, h3, h4, h5, h6 {
    padding: 0;
    margin-bottom: 0.5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 1.2;
  }

  h1 {
    padding: 0;
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
  }

  h2 {
    padding: 0;
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
  }

  h3 {
    padding: 0;
    font-size: ${({ theme }) => theme.typography.h3.fontSize};
  }

  p {
    padding: 0;
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none !important;
    
    &:hover {
      text-decoration: none !important;
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  a:hover, a:focus, a:active, a:visited {
    text-decoration: none !important;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    text-decoration: none !important;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  // 테이블 스타일
  table {
    width: 100%;
    margin-bottom: 1rem;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th, td {
    border-spacing: 0;
    padding: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    border-spacing: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-align: left;
  }

  // 카드 스타일
  .card {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    padding: 1.5rem;
  }

  // 버튼 스타일
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    border: 1px solid transparent;
    transition: all 0.2s;

    &-primary {
      background: ${({ theme }) => theme.colors.primary};
      color: white;

      &:hover {
        background: ${({ theme }) => theme.colors.primaryDark};
      }
    }

    &-secondary {
      background: ${({ theme }) => theme.colors.secondary};
      color: white;
    }

    &-outline {
      border-color: ${({ theme }) => theme.colors.border};
      background: transparent;

      &:hover {
        background: ${({ theme }) => theme.colors.backgroundHover};
      }
    }
  }

  // 폼 스타일
  .form-group {
    margin-bottom: 1rem;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
    }
  }

  // 유틸리티 클래스
  .text-primary { color: ${({ theme }) => theme.colors.primary}; }
  .text-secondary { color: ${({ theme }) => theme.colors.secondary}; }
  .text-success { color: ${({ theme }) => theme.colors.success}; }
  .text-danger { color: ${({ theme }) => theme.colors.danger}; }
  .text-warning { color: ${({ theme }) => theme.colors.warning}; }
  .text-info { color: ${({ theme }) => theme.colors.info}; }

  .bg-primary { background-color: ${({ theme }) => theme.colors.primary}; }
  .bg-secondary { background-color: ${({ theme }) => theme.colors.secondary}; }
  .bg-success { background-color: ${({ theme }) => theme.colors.success}; }
  .bg-danger { background-color: ${({ theme }) => theme.colors.danger}; }
  .bg-warning { background-color: ${({ theme }) => theme.colors.warning}; }
  .bg-info { background-color: ${({ theme }) => theme.colors.info}; }

  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 1rem; }
  .mt-4 { margin-top: 1.5rem; }
  .mt-5 { margin-top: 3rem; }

  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 1rem; }
  .mb-4 { margin-bottom: 1.5rem; }
  .mb-5 { margin-bottom: 3rem; }

  .ml-1 { margin-left: 0.25rem; }
  .ml-2 { margin-left: 0.5rem; }
  .ml-3 { margin-left: 1rem; }
  .ml-4 { margin-left: 1.5rem; }
  .ml-5 { margin-left: 3rem; }

  .mr-1 { margin-right: 0.25rem; }
  .mr-2 { margin-right: 0.5rem; }
  .mr-3 { margin-right: 1rem; }
  .mr-4 { margin-right: 1.5rem; }
  .mr-5 { margin-right: 3rem; }

  .p-1 { padding: 0.25rem; }
  .p-2 { padding: 0.5rem; }
  .p-3 { padding: 1rem; }
  .p-4 { padding: 1.5rem; }
  .p-5 { padding: 3rem; }

  .d-flex { display: flex; }
  .flex-column { flex-direction: column; }
  .justify-content-between { justify-content: space-between; }
  .align-items-center { align-items: center; }
  .flex-grow-1 { flex-grow: 1; }

  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-left { text-align: left; }

  .w-100 { width: 100%; }
  .h-100 { height: 100%; }

  
`;

export default GlobalStyle; 