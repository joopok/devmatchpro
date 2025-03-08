import styled from 'styled-components';

export const FormContainer = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 32px;
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

export const TermsContainer = styled.div`
  margin-bottom: 24px;
`;

export const SignatureArea = styled.div`
  margin-top: 32px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`; 