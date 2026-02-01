/**
 * ============================================================================
 * CUSTOM HOOKS - Data Fetching with React Query (TanStack Query)
 * ============================================================================
 * 
 * This file demonstrates custom hooks for data fetching using React Query.
 * 
 * WHY REACT QUERY?
 * React Query (TanStack Query) provides:
 * 1. Automatic caching and cache invalidation
 * 2. Background data refetching
 * 3. Loading/error states out of the box
 * 4. Optimistic updates for mutations
 * 5. Pagination and infinite scroll support
 * 
 * LEARNING RESOURCES:
 * - Official docs: https://tanstack.com/query/latest
 * - Tutorial: https://tanstack.com/query/latest/docs/react/overview
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDashboardData,
  kpiMetrics,
  monthlyRevenueData,
  weeklyActivityData,
  categoryDistribution,
  users,
  transactions,
  simulateApiDelay,
} from '@/data/mockData';
import type { User, Transaction } from '@/types/dashboard';

// ============================================================================
// QUERY KEYS
// ============================================================================

/**
 * Query keys are used to identify and cache queries.
 * 
 * BEST PRACTICE: Define query keys as constants to:
 * 1. Avoid typos
 * 2. Enable easy refactoring
 * 3. Provide intellisense support
 * 
 * PATTERN: Use arrays for query keys to support hierarchical invalidation.
 * For example, invalidating ['users'] will also invalidate ['users', 'list']
 */
export const queryKeys = {
  // Dashboard queries
  dashboard: ['dashboard'] as const,
  dashboardSummary: ['dashboard', 'summary'] as const,
  
  // KPI queries
  kpis: ['kpis'] as const,
  
  // Chart data queries
  revenueChart: ['charts', 'revenue'] as const,
  activityChart: ['charts', 'activity'] as const,
  categoryChart: ['charts', 'category'] as const,
  
  // User queries
  users: ['users'] as const,
  userById: (id: string) => ['users', id] as const,
  
  // Transaction queries
  transactions: ['transactions'] as const,
  transactionById: (id: string) => ['transactions', id] as const,
} as const;

// ============================================================================
// DASHBOARD HOOKS
// ============================================================================

/**
 * Fetches all dashboard data in a single query.
 * 
 * @returns Query result with dashboard data, loading state, and error state
 * 
 * LEARNING POINT: useQuery options explained:
 * - queryKey: Unique identifier for caching
 * - queryFn: Async function that fetches data
 * - staleTime: How long data is considered fresh (no refetch)
 * - gcTime: How long to keep unused data in cache (garbage collection)
 * 
 * USAGE:
 * const { data, isLoading, error } = useDashboardData();
 * if (isLoading) return <Skeleton />;
 * if (error) return <Error />;
 * return <Dashboard data={data} />;
 */
export function useDashboardData() {
  return useQuery({
    queryKey: queryKeys.dashboardSummary,
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Keep in cache for 10 minutes
  });
}

/**
 * Fetches KPI metrics data.
 * Separated from main dashboard for granular cache control.
 */
export function useKPIMetrics() {
  return useQuery({
    queryKey: queryKeys.kpis,
    queryFn: async () => {
      await simulateApiDelay(500);
      return kpiMetrics;
    },
    staleTime: 60 * 1000, // KPIs refresh every minute
  });
}

// ============================================================================
// CHART DATA HOOKS
// ============================================================================

/**
 * Fetches revenue chart data.
 * 
 * PATTERN: Separating chart data into individual hooks allows:
 * 1. Independent loading states for each chart
 * 2. Different stale times based on data update frequency
 * 3. Targeted cache invalidation
 */
export function useRevenueChartData() {
  return useQuery({
    queryKey: queryKeys.revenueChart,
    queryFn: async () => {
      await simulateApiDelay(600);
      return monthlyRevenueData;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetches weekly activity chart data.
 */
export function useActivityChartData() {
  return useQuery({
    queryKey: queryKeys.activityChart,
    queryFn: async () => {
      await simulateApiDelay(400);
      return weeklyActivityData;
    },
    staleTime: 2 * 60 * 1000, // Activity data updates more frequently
  });
}

/**
 * Fetches category distribution for pie charts.
 */
export function useCategoryDistribution() {
  return useQuery({
    queryKey: queryKeys.categoryChart,
    queryFn: async () => {
      await simulateApiDelay(500);
      return categoryDistribution;
    },
    staleTime: 10 * 60 * 1000, // Categories change less frequently
  });
}

// ============================================================================
// USER DATA HOOKS
// ============================================================================

/**
 * Fetches all users with optional filtering.
 * 
 * @param filters - Optional filters to apply
 * 
 * ADVANCED PATTERN: You can pass parameters to queryFn and include
 * them in the queryKey for proper cache separation.
 */
export function useUsers(filters?: { status?: string; role?: string }) {
  return useQuery({
    queryKey: [...queryKeys.users, filters],
    queryFn: async () => {
      await simulateApiDelay(700);
      
      let filteredUsers = [...users];
      
      if (filters?.status) {
        filteredUsers = filteredUsers.filter(u => u.status === filters.status);
      }
      if (filters?.role) {
        filteredUsers = filteredUsers.filter(u => u.role === filters.role);
      }
      
      return filteredUsers;
    },
  });
}

/**
 * Fetches a single user by ID.
 * 
 * @param id - User ID
 * 
 * OPTION: enabled - Query only runs when this is true.
 * Useful for dependent queries or conditional fetching.
 */
export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.userById(id ?? ''),
    queryFn: async () => {
      await simulateApiDelay(300);
      const user = users.find(u => u.id === id);
      if (!user) throw new Error('User not found');
      return user;
    },
    enabled: !!id, // Only fetch when ID is provided
  });
}

// ============================================================================
// TRANSACTION HOOKS
// ============================================================================

/**
 * Fetches all transactions.
 */
export function useTransactions() {
  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: async () => {
      await simulateApiDelay(600);
      return transactions;
    },
  });
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Mutation hook for updating a user.
 * 
 * MUTATIONS vs QUERIES:
 * - Queries: Read data (GET requests)
 * - Mutations: Write data (POST, PUT, DELETE requests)
 * 
 * MUTATION OPTIONS:
 * - mutationFn: Async function that performs the update
 * - onSuccess: Called after successful mutation
 * - onError: Called if mutation fails
 * - onSettled: Called after mutation completes (success or error)
 * 
 * USAGE:
 * const mutation = useUpdateUser();
 * mutation.mutate({ id: '1', updates: { status: 'active' } });
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id, 
      updates 
    }: { 
      id: string; 
      updates: Partial<User>;
    }) => {
      await simulateApiDelay(500);
      
      // In a real app, this would be an API call:
      // return await api.users.update(id, updates);
      
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) throw new Error('User not found');
      
      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      
      return updatedUser;
    },
    
    onSuccess: (updatedUser) => {
      // Invalidate and refetch user queries
      // This ensures the UI shows the latest data
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.userById(updatedUser.id) 
      });
    },
    
    onError: (error) => {
      console.error('Failed to update user:', error);
      // In a real app, you might show a toast notification here
    },
  });
}

/**
 * Mutation hook for creating a new transaction.
 * 
 * OPTIMISTIC UPDATES: For better UX, you can update the cache
 * immediately before the API call completes, then roll back if it fails.
 */
export function useCreateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newTransaction: Omit<Transaction, 'id'>) => {
      await simulateApiDelay(500);
      
      const transaction: Transaction = {
        ...newTransaction,
        id: `txn-${Date.now()}`,
      };
      
      transactions.unshift(transaction);
      return transaction;
    },
    
    // OPTIMISTIC UPDATE PATTERN
    onMutate: async (newTransaction) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions });
      
      // Snapshot previous value
      const previousTransactions = queryClient.getQueryData(queryKeys.transactions);
      
      // Optimistically update cache
      queryClient.setQueryData(queryKeys.transactions, (old: Transaction[] | undefined) => {
        const optimisticTransaction: Transaction = {
          ...newTransaction,
          id: `temp-${Date.now()}`,
        };
        return old ? [optimisticTransaction, ...old] : [optimisticTransaction];
      });
      
      // Return context for rollback
      return { previousTransactions };
    },
    
    onError: (err, newTransaction, context) => {
      // Rollback on error
      if (context?.previousTransactions) {
        queryClient.setQueryData(queryKeys.transactions, context.previousTransactions);
      }
    },
    
    onSettled: () => {
      // Refetch to ensure sync with server
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
    },
  });
}
