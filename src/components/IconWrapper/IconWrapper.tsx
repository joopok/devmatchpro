import React from 'react';
import styled from 'styled-components';

interface StyledIconWrapperProps {
  $position: 'left' | 'right';
}

const StyledIconWrapper = styled.span<StyledIconWrapperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ $position }) => $position === 'left' ? '0.5rem' : '0'};
  margin-left: ${({ $position }) => $position === 'right' ? '0.5rem' : '0'};
`;

export interface IconWrapperProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  position = 'left',
  className
}) => {
  return (
    <StyledIconWrapper $position={position} className={className}>
      {children}
    </StyledIconWrapper>
  );
};

export default IconWrapper; 