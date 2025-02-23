import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
}

// localStorage에서 theme 값을 가져오는 함수
const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    return prefersDark;
  }
  return savedTheme === 'dark';
};

const initialState: ThemeState = {
  isDarkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      localStorage.setItem('theme', action.payload ? 'dark' : 'light');
    },
  },
});

// 두 액션 모두 export
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer; 