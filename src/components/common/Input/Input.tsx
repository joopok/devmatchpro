import React from 'react';
import styled from 'styled-components';

interface InputBaseProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  prefix?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

export type InputProps = InputBaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputBaseProps>;

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
`;

const StyledInput = styled.input<{ $error?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
  }
`;

const StyledTextArea = styled.textarea<{ $error?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.textSecondary};
`;

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, helperText, fullWidth, prefix, multiline, rows = 1, ...props }, ref) => {
    const Component = multiline ? StyledTextArea : StyledInput;
    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        {prefix && <div>{prefix}</div>}
        {React.createElement(Component, {
          ref,
          rows,
          $error: error,
          ...props
        })}
        {helperText && <HelperText $error={error}>{helperText}</HelperText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input'; 