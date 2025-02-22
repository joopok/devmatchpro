import React from 'react';
import styled from 'styled-components';

interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div<{ $placement: string }>`
  position: absolute;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.text};
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  
  ${({ $placement }) => {
    switch ($placement) {
      case 'top':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
        `;
      case 'bottom':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
        `;
      case 'left':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(-8px);
        `;
      case 'right':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
        `;
      default:
        return '';
    }
  }}
  
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
  
  ${TooltipContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
}) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipContent $placement={placement}>
        {content}
      </TooltipContent>
    </TooltipContainer>
  );
}; 