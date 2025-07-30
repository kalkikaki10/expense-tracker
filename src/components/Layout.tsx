import React from 'react';
import { Home, PlusCircle, BarChart3, Settings, TrendingUp, TrendingDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  totalIncome: number;
  totalExpenses: number;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onViewChange, 
  totalIncome, 
  totalExpenses 
}) => {
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'add', name: 'Add Transaction', icon: PlusCircle },
    { id: 'transactions', name: 'Transactions', icon: BarChart3 },
    { id: 'reports', name: 'Reports', icon: Settings },
  ];

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">ExpenseTracker</h1>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Income: ₹{totalIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center space-x-2 text-red-600">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm font-medium">Expenses: ₹{totalExpenses.toLocaleString('en-IN')}</span>
              </div>
              <div className={`text-sm font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Balance: ₹{balance.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <nav className="bg-white rounded-2xl shadow-lg p-6">
              <ul className="space-y-3">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onViewChange(item.id)}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          currentView === item.id
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg min-h-[600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;