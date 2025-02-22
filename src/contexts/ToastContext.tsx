import React, { createContext, useContext, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastContextValue {
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const addToast = useCallback((type: ToastType, message: string) => {
    // 토스트 추가 로직
  }, []);

  const removeToast = useCallback((id: string) => {
    // 토스트 제거 로직
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}; 