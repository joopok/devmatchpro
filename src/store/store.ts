import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import authReducer, { AuthState } from './auth/authSlice';
import projectReducer from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface RootStates {
  auth: AuthState,
} 