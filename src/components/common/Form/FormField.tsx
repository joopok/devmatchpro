import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../Input';
import { FormFieldContainer, Label, ErrorText } from './FormField.styles';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  validate?: (value: any) => boolean | string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  validate,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormFieldContainer>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        {...register(name, { validate })}
        error={!!errors[name]}
        {...props}
      />
      {errors[name] && (
        <ErrorText>{errors[name]?.message as string}</ErrorText>
      )}
    </FormFieldContainer>
  );
}; 