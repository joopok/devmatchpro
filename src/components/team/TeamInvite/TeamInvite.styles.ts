import styled from '@emotion/styled';

export const InviteContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;

  > * {
    flex: 1;
  }

  button {
    flex: 0 0 auto;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

export const InviteList = styled.div`
  h3 {
    margin: 0 0 16px;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }
`;

export const InviteItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const ItemInfo = styled.div`
  p {
    margin: 0 0 4px;
    font-size: 1rem;
    font-weight: 500;
  }

  span {
    display: inline-block;
    padding: 2px 8px;
    margin-right: 8px;
    background-color: #e9ecef;
    border-radius: 12px;
    font-size: 0.85rem;
    color: #495057;
  }

  small {
    color: #666;
    font-size: 0.85rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`; 