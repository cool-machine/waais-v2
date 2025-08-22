import { useState, useCallback } from 'react';

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface UsePaginationReturn extends PaginationState {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  reset: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

function usePagination(initialLimit = 10): UsePaginationReturn {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: initialLimit,
    total: 0,
    pages: 0,
  });

  const setPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setPagination(prev => ({ 
      ...prev, 
      limit, 
      page: 1, // Reset to first page when changing limit
      pages: Math.ceil(prev.total / limit)
    }));
  }, []);

  const setTotal = useCallback((total: number) => {
    setPagination(prev => ({ 
      ...prev, 
      total, 
      pages: Math.ceil(total / prev.limit)
    }));
  }, []);

  const reset = useCallback(() => {
    setPagination({
      page: 1,
      limit: initialLimit,
      total: 0,
      pages: 0,
    });
  }, [initialLimit]);

  return {
    ...pagination,
    setPage,
    setLimit,
    setTotal,
    reset,
    hasNext: pagination.page < pagination.pages,
    hasPrevious: pagination.page > 1,
  };
}

export default usePagination;