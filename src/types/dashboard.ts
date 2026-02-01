/**
 * ============================================================================
 * DASHBOARD TYPES - Type Definitions for the Dashboard Application
 * ============================================================================
 * 
 * This file contains TypeScript interfaces and types used throughout the
 * dashboard application. Centralizing types here provides:
 * 
 * 1. Single source of truth for data structures
 * 2. Better IDE autocomplete and error detection
 * 3. Easier refactoring when data shapes change
 * 4. Self-documenting code through explicit type definitions
 * 
 * LEARNING POINTS:
 * - Use `interface` for object shapes that might be extended
 * - Use `type` for unions, intersections, and computed types
 * - Export types individually for tree-shaking benefits
 */

// ============================================================================
// CHART DATA TYPES
// ============================================================================

/**
 * Represents a single data point for time-series charts (line, area, bar).
 * 
 * @property name - The x-axis label (e.g., "January", "Week 1")
 * @property value - The primary numeric value
 * @property previousValue - Optional comparison value (e.g., last year's data)
 * 
 * USAGE EXAMPLE:
 * const data: ChartDataPoint[] = [
 *   { name: "Jan", value: 4000, previousValue: 3500 },
 *   { name: "Feb", value: 3000, previousValue: 2800 },
 * ];
 */
export interface ChartDataPoint {
  name: string;
  value: number;
  previousValue?: number;
}

/**
 * Represents a segment in a pie/donut chart.
 * 
 * @property name - The segment label
 * @property value - The numeric value (will be converted to percentage)
 * @property color - CSS color value for the segment
 */
export interface PieChartSegment {
  name: string;
  value: number;
  color: string;
}

// ============================================================================
// ANALYTICS DATA TYPES
// ============================================================================

/**
 * Key Performance Indicator (KPI) card data structure.
 * Used in summary cards at the top of dashboards.
 * 
 * @property id - Unique identifier for React keys
 * @property title - Display name of the metric
 * @property value - Current value (formatted string)
 * @property change - Percentage change from previous period
 * @property trend - Direction of change for visual indicator
 * @property icon - Lucide icon name (optional)
 */
export interface KPIMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon?: string;
}

/**
 * Revenue data for analytics tracking.
 * Extends ChartDataPoint with additional revenue-specific fields.
 */
export interface RevenueData extends ChartDataPoint {
  revenue: number;
  expenses: number;
  profit: number;
}

// ============================================================================
// TABLE DATA TYPES
// ============================================================================

/**
 * Represents a user/customer in the data table.
 * 
 * DESIGN PATTERN: This interface follows the "Entity" pattern where
 * each record has a unique `id` and timestamps for audit tracking.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  lastActive: Date;
  createdAt: Date;
}

/**
 * Represents a transaction record.
 * Used in financial dashboards and reporting tables.
 */
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

/**
 * Configuration for table sorting.
 * 
 * @property column - The column key to sort by
 * @property direction - Sort order
 * 
 * LEARNING POINT: Using `keyof T` would make this generic:
 * type SortConfig<T> = { column: keyof T; direction: 'asc' | 'desc' }
 */
export interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

/**
 * Filter configuration for data tables.
 * Supports multiple filter types for different column types.
 */
export interface FilterConfig {
  column: string;
  value: string | number | boolean;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
}

/**
 * Navigation item for the sidebar.
 */
export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Generic API response wrapper.
 * Provides consistent structure for all API responses.
 * 
 * DESIGN PATTERN: This follows the "Envelope" pattern where
 * actual data is wrapped with metadata (status, pagination, etc.)
 * 
 * @template T - The type of data being returned
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

/**
 * Dashboard summary response containing all KPIs and charts data.
 * Used by the main dashboard page to fetch all data in one request.
 */
export interface DashboardSummary {
  kpis: KPIMetric[];
  revenueChart: ChartDataPoint[];
  userGrowthChart: ChartDataPoint[];
  categoryDistribution: PieChartSegment[];
  recentTransactions: Transaction[];
}
