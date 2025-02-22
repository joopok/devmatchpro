import React from 'react';
import { useToast } from '../../../hooks/useToast';
import { Toast } from './Toast';
import { ToastWrapper } from './Toast.styles';

export const ToastContainer: React.FC = () => {
  const { toasts, remove } = useToast();

  return (
    <ToastWrapper>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => remove(toast.id)}
        />
      ))}
    </ToastWrapper>
  );
}; 