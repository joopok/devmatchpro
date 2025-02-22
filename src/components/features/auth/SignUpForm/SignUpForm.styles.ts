import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
`;

export const FormTitle = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`; 