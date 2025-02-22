import { useContext } from 'react';
import { ToastContext } from '../components/common/Toast/Toast';
import { ToastContextValue } from '../components/common/Toast/types';

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 