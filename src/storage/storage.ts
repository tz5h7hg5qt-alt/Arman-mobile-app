
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../types/transaction';

const TRANSACTIONS_KEY = '@qazyna_transactions';

export const storage = {
  // Барлық операцияларды жүктеу
  async getTransactions(): Promise<Transaction[]> {
    try {
      const data = await AsyncStorage.getItem(
        TRANSACTIONS_KEY
      );

      if (!data) {
        return [];
      }

      return JSON.parse(data) as Transaction[];
    } catch (error) {
      console.log('Операцияларды жүктеу қатесі:', error);
      return [];
    }
  },

  // Операцияларды сақтау
  async saveTransactions(
    transactions: Transaction[]
  ): Promise<void> {
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
};
