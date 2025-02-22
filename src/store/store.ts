import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './auth/authSlice';
import projectReducer from './slices/projectSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    theme: themeReducer,
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