import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  
  ${props => {
    switch(props.$position) {
      case 'top-right':
        return `
          top: 0;
          right: 0;
        `;
      case 'top-left':
        return `
          top: 0;
          left: 0;
        `;
      case 'bottom-right':
        return `
          bottom: 0;
          right: 0;
        `;
      case 'bottom-left':
        return `
          bottom: 0;
          left: 0;
        `;
      default:
        return `
          top: 0;
          right: 0;
        `;
    }
  }}
`;

const ToastItemStyled = styled.div<{ $type: ToastType }>`
  padding: 12px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  ${props => {
    switch(props.$type) {
      case 'success':
        return `background-color: #4caf50; color: white;`;
      case 'error':
        return `background-color: #f44336; color: white;`;
      case 'warning':
        return `background-color: #ff9800; color: white;`;
      case 'info':
      default:
        return `background-color: #2196f3; color: white;`;
    }
  }}
`;

const ToastContentStyled = styled.div`
  flex: 1;
`;

const CloseButtonStyled = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-left: 8px;
  font-size: 16px;
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
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.body);
  }, []);

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
      {portalElement && toasts.length > 0 && (
        createPortal(
          <ToastContainer $position="top-right">
            {toasts.map(toast => (
              <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} onClose={() => remove(toast.id)} />
            ))}
          </ToastContainer>,
          portalElement
        )
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