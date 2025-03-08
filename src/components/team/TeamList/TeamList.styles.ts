import styled from '@emotion/styled';

export const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  > button {
    margin-bottom: 24px;
  }
`;

export const TeamCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 16px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

export const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;

  div {
    h3 {
      margin: 0 0 4px;
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      margin: 0 0 8px;
      color: #666;
      font-size: 0.9rem;
    }

    span {
      display: inline-block;
      padding: 2px 8px;
      background-color: #e9ecef;
      border-radius: 12px;
      font-size: 0.85rem;
      color: #495057;
    }
  }
`;

export const Stats = styled.div`
  display: flex;
  gap: 24px;
  margin: 0 32px;

  @media (max-width: 768px) {
    margin: 0;
    justify-content: center;
  }
`;

export const StatItem = styled.div`
  text-align: center;

  strong {
    display: block;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }

  span {
    font-size: 0.9rem;
    color: #666;
  }
`;

export const Actions = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
  }
`; 