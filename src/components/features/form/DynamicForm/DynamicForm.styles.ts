import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ValidationMessage = styled.span<{ $error?: boolean }>`
  font-size: 14px;
  color: ${({ theme, $error }) =>
    $error ? theme.colors.error : theme.colors.textSecondary};
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`; 