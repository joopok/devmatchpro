import React from 'react';
import { StyledInputGroup } from './InputGroup.styles';

interface InputGroupProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  spacing?: number;
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  direction = 'column',
  spacing = 16,
  className,
}) => (
  <StyledInputGroup
    direction={direction}
    spacing={spacing}
    className={className}
  >
    {children}
  </StyledInputGroup>
); 