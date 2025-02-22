import styled from 'styled-components';

export const ManagerContainer = styled.div`
  padding: 24px;
`;

export const KeyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

export const KeyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  > div:last-child {
    display: flex;
    gap: 8px;
  }
`;

export const KeyInfo = styled.div`
  flex: 1;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    font-family: monospace;
    padding: 4px 8px;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 4px;
  }

  small {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const CreateKeyForm = styled.div`
  margin: 24px 0;

  h3 {
    margin-bottom: 16px;
  }

  > div {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
`;

export const Permissions = styled.div`
  margin-top: 16px;

  h4 {
    margin-bottom: 8px;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`; 