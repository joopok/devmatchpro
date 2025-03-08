import React from 'react';
import { Transaction } from '../../../types/payment';
import {
  HistoryContainer,
  HistoryTitle,
  TransactionList,
  TransactionItem,
  DateInfo,
  NoTransactions,
} from './TransactionHistory.styles';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatAmount = (amount: number) => {
  return amount.toLocaleString('ko-KR');
};

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  if (transactions.length === 0) {
    return (
      <NoTransactions>
        거래 내역이 없습니다.
      </NoTransactions>
    );
  }

  return (
    <HistoryContainer>
      <HistoryTitle>거래 내역</HistoryTitle>
      <TransactionList>
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id}>
            <div>
              <h4>{transaction.description || `${transaction.type} 거래`}</h4>
              <DateInfo>{formatDate(transaction.createdAt)}</DateInfo>
            </div>
            <div>
              <strong>
                {transaction.type === 'DEPOSIT' ? '+' : '-'}
                {formatAmount(transaction.amount)}원
              </strong>
              <span>{transaction.status}</span>
            </div>
          </TransactionItem>
        ))}
      </TransactionList>
    </HistoryContainer>
  );
}; 