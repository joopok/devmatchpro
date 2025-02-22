import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  text-align: center;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 4px;
`; 