import React from 'react';
import styled from 'styled-components';

interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
  error?: string;
  direction?: 'row' | 'column';
  spacing?: number;
  className?: string;
  helperText?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  error,
  direction = 'column',
  spacing = 8,
  className,
  helperText,
  required = false,
}) => {
  return (
    <Container 
      className={className} 
      $direction={direction} 
      $spacing={spacing}
    >
      {label && (
        <Label>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      
      <ChildrenContainer $direction={direction}>
        {children}
      </ChildrenContainer>
      
      {helperText && !error && <HelperText>{helperText}</HelperText>}
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

const Container = styled.div<{ $direction: string; $spacing: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $spacing }) => $spacing}px;
  margin-bottom: 16px;
`;

const ChildrenContainer = styled.div<{ $direction: string }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ $direction }) => $direction === 'row' ? '8px' : '0'};
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;

const HelperText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 