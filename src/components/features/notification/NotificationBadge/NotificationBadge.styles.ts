import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const BadgeContainer = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  
  &.pulse {
    animation: ${pulse} 1s ease-in-out;
  }
`;

export const Counter = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`;

export const Indicator = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.error};
  border-radius: 50%;
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: -32px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.text};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  
  ${BadgeContainer}:hover & {
    opacity: 1;
  }
`; 