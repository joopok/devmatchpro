import styled from 'styled-components';

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