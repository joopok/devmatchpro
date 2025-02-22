import styled from '@emotion/styled';

export const CreateContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;

  h2 {
    margin: 0 0 24px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    text-align: center;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > div:first-of-type {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }
`; 