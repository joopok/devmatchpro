import React, { createContext, useContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { ToastType } from './types';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: () => void;
}

interface ToastContextValue {
  toasts: ToastProps[];
  show: (type: ToastType, message: string) => void;
  remove: (id: string) => void;
}

const ToastContainer = styled.div<{ $position: string }>`
  position: fixed;
  z-index: 1000;
  // ... 나머지 스타일
`;

const ToastItemStyled = styled.div<{ $type: ToastType }>`
  // ... 스타일
`;

const ToastContentStyled = styled.div`
  // ... 스타일
`;

const CloseButtonStyled = styled.button`
  // ... 스타일
`;

export const Toast: React.FC<ToastProps> = ({ id, type, message, onClose }) => {
  return (
    <ToastItemStyled $type={type}>
      <ToastContentStyled>{message}</ToastContentStyled>
      <CloseButtonStyled onClick={onClose}>✕</CloseButtonStyled>
    </ToastItemStyled>
  );
};

export const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  show: () => {},
  remove: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const show = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(prev => [...prev, { id, type, message, onClose: () => {
      setToasts(prev => prev.filter(t => t.id !== id));
    } }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, show, remove }}>
      {children}
      {createPortal(
        <ToastContainer $position="top-right">
          {toasts.map(toast => (
            <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} onClose={() => remove(toast.id)} />
          ))}
        </ToastContainer>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};