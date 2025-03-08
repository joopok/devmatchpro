import React from 'react';
import { FormField } from '../FormField/FormField';

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
  <FormField
    direction={direction}
    spacing={spacing}
    className={className}
  >
    {children}
  </FormField>
); 