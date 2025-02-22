// 결제 관련 타입 정의
export type PaymentMethodType = 'CARD' | 'BANK' | 'VIRTUAL';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type TransactionType = 'PAYMENT' | 'DEPOSIT' | 'REFUND';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethodType;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethodInfo {
  id: string;
  type: PaymentMethodType;
  name: string;
  last4?: string;
  expiryMonth?: string;
  expiryYear?: string;
  isDefault: boolean;
} 