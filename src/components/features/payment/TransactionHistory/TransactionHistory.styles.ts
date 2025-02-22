import styled from '@emotion/styled';

export const HistoryContainer = styled.div`
  padding: 16px;
`;

export const HistoryTitle = styled.h2`
  margin-bottom: 24px;
`;

export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TransactionItem = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
`;

export const DateInfo = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const NoTransactions = styled.div`
  text-align: center;
  padding: 32px;
  color: #666;
`; 