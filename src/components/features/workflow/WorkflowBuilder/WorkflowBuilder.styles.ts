import styled from '@emotion/styled';

export const BuilderContainer = styled.div`
  display: flex;
  height: 100vh;
  padding: 20px;
  gap: 20px;
`;

export const Sidebar = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const NodeTypeList = styled.div`
  h3 {
    margin: 0 0 16px;
    font-size: 1.1rem;
    font-weight: 500;
  }

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NodeProperties = styled.div`
  h3 {
    margin: 0 0 16px;
    font-size: 1.1rem;
    font-weight: 500;
  }

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ValidationError = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 8px;

  p {
    margin: 4px 0;
  }
`; 