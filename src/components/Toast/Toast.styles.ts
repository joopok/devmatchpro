import styled from 'styled-components';
import { ToastType, ToastPosition } from './types';

export const ToastWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ToastItem = styled.div<{ $type: string }>`
  padding: 12px 16px;
  border-radius: 4px;
  background-color: ${({ $type, theme }) => 
    $type === 'success' ? theme.colors.success :
    $type === 'error' ? theme.colors.error :
    $type === 'warning' ? theme.colors.warning :
    theme.colors.info};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ToastContent = styled.div`
  flex: 1;
  margin-right: 12px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`; 