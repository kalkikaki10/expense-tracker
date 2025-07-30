import { useState, useEffect } from 'react';
import { Transaction } from '../types';

const STORAGE_KEY = 'expense_tracker_transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      // Initialize with sample data
      const sampleTransactions: Transaction[] = [
        {
          id: '1',
          type: 'expense',
          amount: 1200,
          category: 'Food & Dining',
          description: 'Lunch at restaurant',
          date: '2024-01-15',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'income',
          amount: 75000,
          category: 'Salary',
          description: 'Monthly salary',
          date: '2024-01-01',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          type: 'expense',
          amount: 500,
          category: 'Transportation',
          description: 'Auto rickshaw fare',
          date: '2024-01-14',
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          type: 'expense',
          amount: 25000,
          category: 'Rent',
          description: 'Monthly rent',
          date: '2024-01-05',
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          type: 'expense',
          amount: 3500,
          category: 'Shopping',
          description: 'Groceries',
          date: '2024-01-12',
          createdAt: new Date().toISOString(),
        },
      ];
      setTransactions(sampleTransactions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTransactions));
    }
  }, []);

  const saveTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...transactions, newTransaction];
    saveTransactions(updated);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const updated = transactions.map(t => 
      t.id === id ? { ...t, ...updates } : t
    );
    saveTransactions(updated);
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    saveTransactions(updated);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};