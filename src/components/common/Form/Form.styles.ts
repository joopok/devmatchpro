import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const ErrorText = styled.span`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.colors.error};
`; 