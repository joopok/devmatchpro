import styled from '@emotion/styled';

export const ManagerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  > div:first-of-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
`;

export const RoleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

export const RoleCard = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: ${({ selected }) => (selected ? '#f8f9fa' : '#fff')};
  border: 1px solid ${({ selected }) => (selected ? '#007bff' : '#eee')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #007bff;
    background-color: #f8f9fa;
  }

  > div:first-of-type {
    h3 {
      margin: 0 0 4px;
      font-size: 1.1rem;
      font-weight: 500;
    }

    p {
      margin: 0 0 8px;
      color: #666;
      font-size: 0.9rem;
    }
  }
`;

export const PermissionGrid = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 24px;

  h3 {
    margin: 0 0 24px;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const ResourceGroup = styled.div`
  margin-bottom: 32px;

  h4 {
    margin: 0 0 16px;
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;

    small {
      font-weight: normal;
      color: #666;
      font-size: 0.9rem;
    }
  }
`;

export const ActionGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    small {
      color: #666;
      font-size: 0.85rem;
    }
  }
`; 