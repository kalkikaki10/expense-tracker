export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getMonthYear = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
};

export const getCurrentMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const getDateRange = (period: 'week' | 'month' | 'year'): { start: string; end: string } => {
  const now = new Date();
  const end = now.toISOString().split('T')[0];
  
  let start: Date;
  switch (period) {
    case 'week':
      start = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      start = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'year':
      start = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
  }
  
  return {
    start: start.toISOString().split('T')[0],
    end,
  };
};