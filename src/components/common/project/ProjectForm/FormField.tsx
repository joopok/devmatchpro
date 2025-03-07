import React from 'react';
import { FormFieldContainer, FormFieldLabel } from './FormField.styles';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>{label}</FormFieldLabel>
      {children}
    </FormFieldContainer>
  );
};
