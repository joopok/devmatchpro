import styled from 'styled-components';

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ErrorText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`; 