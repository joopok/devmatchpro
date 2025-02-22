import React from 'react';
import styled from 'styled-components';

interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  error,
}) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`; 