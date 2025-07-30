import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currency';
import { getMonthYear } from '../utils/date';
import { allCategories } from '../data/categories';
import { BarChart3, PieChart, TrendingUp, Calendar, Download } from 'lucide-react';

interface ReportsProps {
  transactions: Transaction[];
}

const Reports: React.FC<ReportsProps> = ({ transactions }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('currentMonth');
  const [reportType, setReportType] = useState<'overview' | 'category' | 'trends'>('overview');

  const getFilteredTransactions = () => {
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'currentMonth':
        const currentMonth = now.toISOString().substring(0, 7);
        return transactions.filter(t => t.date.startsWith(currentMonth));
      
      case 'lastMonth':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
        const lastMonthStr = lastMonth.toISOString().substring(0, 7);
        return transactions.filter(t => t.date.startsWith(lastMonthStr));
      
      case 'last3Months':
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3);
        return transactions.filter(t => new Date(t.date) >= threeMonthsAgo);
      
      case 'currentYear':
        const currentYear = now.getFullYear().toString();
        return transactions.filter(t => t.date.startsWith(currentYear));
      
      default:
        return transactions;
    }
  };

  const filteredTransactions = getFilteredTransactions();

  const reportData = useMemo(() => {
    const income = filteredTransactions.filter(t => t.type === 'income');
    const expenses = filteredTransactions.filter(t => t.type === 'expense');
    
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    
    // Category breakdown
    const categoryBreakdown = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    // Monthly trends
    const monthlyData = filteredTransactions.reduce((acc, t) => {
      const month = t.date.substring(0, 7);
      if (!acc[month]) {
        acc[month] = { income: 0, expenses: 0 };
      }
      acc[month][t.type === 'income' ? 'income' : 'expenses'] += t.amount;
      return acc;
    }, {} as Record<string, { income: number; expenses: number }>);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      categoryBreakdown,
      monthlyData,
      transactionCount: filteredTransactions.length,
      avgTransactionAmount: filteredTransactions.length > 0 
        ? filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / filteredTransactions.length 
        : 0,
    };
  }, [filteredTransactions]);

  const topCategories = Object.entries(reportData.categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const monthlyEntries = Object.entries(reportData.monthlyData)
    .sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h2>
        <p className="text-gray-600">Analyze your spending patterns and financial trends</p>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Period Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="currentMonth">Current Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="last3Months">Last 3 Months</option>
              <option value="currentYear">Current Year</option>
              <option value="allTime">All Time</option>
            </select>
          </div>

          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'overview' | 'category' | 'trends')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="overview">Overview</option>
              <option value="category">Category Analysis</option>
              <option value="trends">Monthly Trends</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Report */}
      {reportType === 'overview' && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(reportData.totalIncome)}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
                <TrendingUp className="h-5 w-5 text-red-500 transform rotate-180" />
              </div>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(reportData.totalExpenses)}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Net Balance</h3>
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <p className={`text-3xl font-bold ${reportData.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(reportData.balance)}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Transactions</h3>
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-purple-600">{reportData.transactionCount}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Average Transaction Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(reportData.avgTransactionAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Savings Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {reportData.totalIncome > 0 
                    ? `${((reportData.balance / reportData.totalIncome) * 100).toFixed(1)}%`
                    : '0%'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Analysis */}
      {reportType === 'category' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-6">
            <PieChart className="h-6 w-6 text-gray-700 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Expense Breakdown by Category</h3>
          </div>

          {topCategories.length > 0 ? (
            <div className="space-y-4">
              {topCategories.map(([category, amount]) => {
                const categoryInfo = allCategories.find(c => c.name === category);
                const percentage = reportData.totalExpenses > 0 ? (amount / reportData.totalExpenses) * 100 : 0;
                
                return (
                  <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div 
                        className="w-6 h-6 rounded-full mr-4 flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: categoryInfo?.color || '#6B7280' }}
                      >
                        {categoryInfo?.icon || '💰'}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{category}</h4>
                        <p className="text-sm text-gray-500">{percentage.toFixed(1)}% of total expenses</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(amount)}</p>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: categoryInfo?.color || '#6B7280'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No expense data available for this period</p>
          )}
        </div>
      )}

      {/* Monthly Trends */}
      {reportType === 'trends' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-gray-700 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Monthly Trends</h3>
          </div>

          {monthlyEntries.length > 0 ? (
            <div className="space-y-4">
              {monthlyEntries.map(([month, data]) => (
                <div key={month} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900">{getMonthYear(month + '-01')}</h4>
                    <div className="text-sm text-gray-500">
                      Balance: <span className={`font-semibold ${
                        data.income - data.expenses >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(data.income - data.expenses)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-600 mb-1">Income</p>
                      <p className="font-semibold text-green-700">{formatCurrency(data.income)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-red-600 mb-1">Expenses</p>
                      <p className="font-semibold text-red-700">{formatCurrency(data.expenses)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available for the selected period</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;