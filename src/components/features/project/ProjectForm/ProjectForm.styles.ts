import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 16px;
    
    > * {
      flex: 1;
    }
  }
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormFieldLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`; 