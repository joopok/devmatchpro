import React from 'react';
import styled from 'styled-components';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

const StyledTextArea = styled.textarea<{ $error?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, ...props }, ref) => (
    <div>
      {label && <label>{label}</label>}
      <StyledTextArea ref={ref} $error={error} {...props} />
      {helperText && <span>{helperText}</span>}
    </div>
  )
);

TextArea.displayName = 'TextArea'; 