import { Category } from '../types';

export const expenseCategories: Category[] = [
  { id: '1', name: 'Food & Dining', type: 'expense', color: '#FF6B6B', icon: '🍽️' },
  { id: '2', name: 'Transportation', type: 'expense', color: '#4ECDC4', icon: '🚗' },
  { id: '3', name: 'Shopping', type: 'expense', color: '#45B7D1', icon: '🛍️' },
  { id: '4', name: 'Entertainment', type: 'expense', color: '#96CEB4', icon: '🎬' },
  { id: '5', name: 'Healthcare', type: 'expense', color: '#FFEAA7', icon: '🏥' },
  { id: '6', name: 'Education', type: 'expense', color: '#DDA0DD', icon: '📚' },
  { id: '7', name: 'Bills & Utilities', type: 'expense', color: '#98D8C8', icon: '💡' },
  { id: '8', name: 'Rent', type: 'expense', color: '#F7DC6F', icon: '🏠' },
  { id: '9', name: 'Insurance', type: 'expense', color: '#BB8FCE', icon: '🛡️' },
  { id: '10', name: 'Personal Care', type: 'expense', color: '#85C1E9', icon: '💄' },
  { id: '11', name: 'Travel', type: 'expense', color: '#F8C471', icon: '✈️' },
  { id: '12', name: 'Investments', type: 'expense', color: '#82E0AA', icon: '📈' },
];

export const incomeCategories: Category[] = [
  { id: '13', name: 'Salary', type: 'income', color: '#27AE60', icon: '💰' },
  { id: '14', name: 'Freelance', type: 'income', color: '#2ECC71', icon: '💻' },
  { id: '15', name: 'Business', type: 'income', color: '#58D68D', icon: '🏢' },
  { id: '16', name: 'Investments', type: 'income', color: '#85C1E9', icon: '📊' },
  { id: '17', name: 'Rental', type: 'income', color: '#A9DFBF', icon: '🏘️' },
  { id: '18', name: 'Other', type: 'income', color: '#D5F4E6', icon: '💸' },
];

export const allCategories = [...expenseCategories, ...incomeCategories];