import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Reports from './components/Reports';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard transactions={transactions} />;
      case 'add':
        return <AddTransaction onAdd={addTransaction} />;
      case 'transactions':
        return (
          <TransactionList 
            transactions={transactions}
            onUpdate={updateTransaction}
            onDelete={deleteTransaction}
          />
        );
      case 'reports':
        return <Reports transactions={transactions} />;
      default:
        return <Dashboard transactions={transactions} />;
    }
  };

  return (
    <Layout
      currentView={currentView}
      onViewChange={setCurrentView}
      totalIncome={totalIncome}
      totalExpenses={totalExpenses}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;