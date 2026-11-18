
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../types/transaction';

const TRANSACTIONS_KEY = '@qazyna_transactions';
const SAVINGS_KEY = '@qazyna_savings';

export interface SavingDeposit {
  id: string;
  amount: number;
  date: string;
  note?: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  targetAmount: number;
  createdAt: string;
  deposits: SavingDeposit[];
}

export const storage = {
  // Барлық операцияларды жүктеу
  async getTransactions(): Promise<Transaction[]> {
    try {
      const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
      return data ? JSON.parse(data) as Transaction[] : [];
    } catch (error) {
      console.log('Операцияларды жүктеу қатесі:', error);
      return [];
    }
  },

  // Операцияларды сақтау
  async saveTransactions(transactions: Transaction[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        TRANSACTIONS_KEY,
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.log('Операцияларды сақтау қатесі:', error);
      throw error;
    }
  },

  // Барлық операцияларды өшіру
  async clearTransactions(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TRANSACTIONS_KEY);
    } catch (error) {
      console.log('Операцияларды өшіру қатесі:', error);
      throw error;
    }
  },

  // Жинақ мақсаттарын жүктеу
  async getSavingGoals(): Promise<SavingGoal[]> {
    try {
      const data = await AsyncStorage.getItem(SAVINGS_KEY);
      return data ? JSON.parse(data) as SavingGoal[] : [];
    } catch (error) {
      console.log('Жинақтарды жүктеу қатесі:', error);
      return [];
    }
  },

  // Жинақ мақсаттарын сақтау
  async saveSavingGoals(goals: SavingGoal[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        SAVINGS_KEY,
        JSON.stringify(goals)
      );
    } catch (error) {
      console.log('Жинақтарды сақтау қатесі:', error);
      throw error;
    }
  },
};
