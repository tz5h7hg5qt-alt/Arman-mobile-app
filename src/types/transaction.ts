
export type TransactionType =
  | 'income'
  | 'expense'
  | 'transfer_in'
  | 'transfer_out';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
  counterparty?: string;
  source?: 'manual' | 'statement';
  externalId?: string;
}
