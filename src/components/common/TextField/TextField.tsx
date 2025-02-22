import React from 'react';
import styled from 'styled-components';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorText = styled.span`
  display: block;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
`;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Wrapper>
        {label && <Label>{label}</Label>}
        <Input ref={ref} $error={!!error} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  }
);

TextField.displayName = 'TextField'; 