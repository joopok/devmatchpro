import React from 'react';
import { ToastItem as StyledToastItem, ToastContent, CloseButton } from './Toast.styles';
import { Toast as ToastType } from './types';

interface ToastProps {
  message: string;
  type: ToastType['type'];
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <StyledToastItem $type={type}>
      <ToastContent>{message}</ToastContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </StyledToastItem>
  );
}; 