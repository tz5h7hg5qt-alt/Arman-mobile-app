
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  SavingGoal,
  SavingDeposit,
  storage,
} from '../storage/storage';

interface SavingsContextType {
  goals: SavingGoal[];
  loading: boolean;
  addGoal: (title: string, targetAmount: number) => Promise<void>;
  addDeposit: (
    goalId: string,
    amount: number,
    note?: string
  ) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  updateGoal: (
    goalId: string,
    title: string,
    targetAmount: number
  ) => Promise<void>;
}

const SavingsContext = createContext<
  SavingsContextType | undefined
>(undefined);

export const SavingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const goalsRef = useRef<SavingGoal[]>([]);

  // Жинақтарды телефон жадынан жүктеу
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const savedGoals = await storage.getSavingGoals();

        goalsRef.current = savedGoals;
        setGoals(savedGoals);
      } catch (error) {
        console.log('Жинақтарды жүктеу қатесі:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, []);

  // Өзгерістерді сақтау
  const saveGoals = async (updatedGoals: SavingGoal[]) => {
    goalsRef.current = updatedGoals;
    setGoals(updatedGoals);

    await storage.saveSavingGoals(updatedGoals);
  };

  // Жаңа мақсат қосу
  const addGoal = async (
    title: string,
    targetAmount: number
  ) => {
    if (!title.trim() || targetAmount <= 0) {
      throw new Error('Мақсат атауы мен сомасын дұрыс енгізіңіз.');
    }

    const newGoal: SavingGoal = {
      id: Date.now().toString(),
      title: title.trim(),
      targetAmount,
      createdAt: new Date().toISOString(),
      deposits: [],
    };

    await saveGoals([newGoal, ...goalsRef.current]);
  };

  // Мақсатқа ақша қосу
  const addDeposit = async (
    goalId: string,
    amount: number,
    note?: string
  ) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('Ақша сомасын дұрыс енгізіңіз.');
    }

    const deposit: SavingDeposit = {
      id: `${Date.now()}-${Math.random()}`,
      amount,
      date: new Date().toISOString(),
      note: note?.trim() || '',
    };

    const updatedGoals = goalsRef.current.map(goal => {
      if (goal.id !== goalId) {
        return goal;
      }

      return {
        ...goal,
        deposits: [deposit, ...goal.deposits],
      };
    });

    await saveGoals(updatedGoals);
  };

  // Мақсатты өшіру
  const deleteGoal = async (goalId: string) => {
    const updatedGoals = goalsRef.current.filter(
      goal => goal.id !== goalId
    );

    await saveGoals(updatedGoals);
  };

  // Мақсатты өзгерту
  const updateGoal = async (
    goalId: string,
    title: string,
    targetAmount: number
  ) => {
    if (!title.trim() || targetAmount <= 0) {
      throw new Error('Мақсат атауы мен сомасын дұрыс енгізіңіз.');
    }

    const updatedGoals = goalsRef.current.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            title: title.trim(),
            targetAmount,
          }
        : goal
    );

    await saveGoals(updatedGoals);
  };

  return (
    <SavingsContext.Provider
      value={{
        goals,
        loading,
        addGoal,
        addDeposit,
        deleteGoal,
        updateGoal,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
};

export const useSavings = () => {
  const context = useContext(SavingsContext);

  if (!context) {
    throw new Error('SavingsProvider қосылмаған!');
  }

  return context;
};
