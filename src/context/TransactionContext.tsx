
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Transaction } from '../types/transaction';
import { storage } from '../storage/storage';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (item: Transaction) => Promise<void>;

  balance: number;
  totalIncome: number;
  totalExpense: number;

  totalTransferIn: number;
  totalTransferOut: number;

  loading: boolean;
}

const TransactionContext =
  createContext<TransactionContextType | undefined>(
    undefined
  );

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<
    Transaction[]
  >([]);

  const [loading, setLoading] = useState(true);

  // Соңғы операциялар тізімін сақтау
  const transactionsRef = useRef<Transaction[]>([]);

  // Телефоннан сақталған операцияларды жүктеу
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTransactions =
          await storage.getTransactions();

        transactionsRef.current = savedTransactions;
        setTransactions(savedTransactions);
      } catch (error) {
        console.log('Жүктеу қатесі:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Жаңа операция қосу
  const addTransaction = async (item: Transaction) => {
    const updatedTransactions = [
      item,
      ...transactionsRef.current,
    ];

    transactionsRef.current = updatedTransactions;
    setTransactions(updatedTransactions);

    await storage.saveTransactions(updatedTransactions);
  };

  // Жалпы кіріс
  const totalIncome = transactions
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  // Жалпы шығыс
  const totalExpense = transactions
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  // Келген аударымдар
  const totalTransferIn = transactions
    .filter(item => item.type === 'transfer_in')
    .reduce((sum, item) => sum + item.amount, 0);

  // Жіберілген аударымдар
  const totalTransferOut = transactions
    .filter(item => item.type === 'transfer_out')
    .reduce((sum, item) => sum + item.amount, 0);

  // Жалпы баланс
  const balance =
    totalIncome +
    totalTransferIn -
    totalExpense -
    totalTransferOut;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        balance,
        totalIncome,
        totalExpense,
        totalTransferIn,
        totalTransferOut,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Басқа экрандарда қолдану
export const useTransactions = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      'TransactionProvider қосылмаған!'
    );
  }

  return context;
};
