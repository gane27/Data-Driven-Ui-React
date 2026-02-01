/**
 * ============================================================================
 * MOCK DATA - Sample Data for Dashboard Development
 * ============================================================================
 *
 * This file contains mock data that simulates what you would receive from
 * a real API or database. Using mock data during development allows you to:
 *
 * 1. Build and test UI components without backend dependencies
 * 2. Create realistic data scenarios for testing edge cases
 * 3. Demonstrate the application with meaningful sample data
 *
 * PRODUCTION NOTE: In a real application, this data would come from:

 * - REST API endpoints
 * - GraphQL queries
 * - Real-time subscriptions
 */

import type {
  ChartDataPoint,
  PieChartSegment,
  KPIMetric,
  User,
  Transaction,
} from "@/types/dashboard";

// ============================================================================
// KPI METRICS DATA
// ============================================================================

/**
 * Key Performance Indicators shown in summary cards.
 *
 * LEARNING POINT: The `as const` assertion could be used to make this
 * readonly, but we're using explicit typing for clarity.
 */
export const kpiMetrics: KPIMetric[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    trend: "up",
    icon: "DollarSign",
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    value: "+2,350",
    change: 180.1,
    trend: "up",
    icon: "Users",
  },
  {
    id: "sales",
    title: "Sales",
    value: "+12,234",
    change: 19.0,
    trend: "up",
    icon: "CreditCard",
  },
  {
    id: "active-users",
    title: "Active Now",
    value: "573",
    change: -5.4,
    trend: "down",
    icon: "Activity",
  },
];

// ============================================================================
// CHART DATA
// ============================================================================

/**
 * Monthly revenue data for line/bar charts.
 *
 * DATA GENERATION TIP: For real applications, you might use libraries like
 * `faker` or `@ngneat/falso` to generate realistic mock data.
 */
export const monthlyRevenueData: ChartDataPoint[] = [
  { name: "Jan", value: 4000, previousValue: 3200 },
  { name: "Feb", value: 3000, previousValue: 2800 },
  { name: "Mar", value: 5000, previousValue: 4200 },
  { name: "Apr", value: 4500, previousValue: 3800 },
  { name: "May", value: 6000, previousValue: 5100 },
  { name: "Jun", value: 5500, previousValue: 4800 },
  { name: "Jul", value: 7000, previousValue: 6200 },
  { name: "Aug", value: 6500, previousValue: 5800 },
  { name: "Sep", value: 8000, previousValue: 7100 },
  { name: "Oct", value: 7500, previousValue: 6800 },
  { name: "Nov", value: 9000, previousValue: 8200 },
  { name: "Dec", value: 8500, previousValue: 7800 },
];

/**
 * Weekly user activity data.
 */
export const weeklyActivityData: ChartDataPoint[] = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 9800 },
  { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3800 },
  { name: "Sun", value: 4300 },
];

/**
 * Category distribution for pie/donut charts.
 *
 * COLOR SYSTEM: These colors use CSS custom properties from our design
 * system (defined in index.css). This ensures consistency and makes
 * theme switching easier.
 */
export const categoryDistribution: PieChartSegment[] = [
  { name: "Electronics", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Clothing", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Home & Garden", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Sports", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 8, color: "hsl(var(--chart-5))" },
];

// ============================================================================
// TABLE DATA
// ============================================================================

/**
 * Sample users for the data table.
 *
 * LEARNING POINT: Date objects are created with `new Date()` to ensure
 * proper date handling. Avoid storing dates as strings when possible.
 */
export const users: User[] = [
  {
    id: "1",
    name: "Ravichandran",
    email: "ravichandran@email.com",
    role: "admin",
    status: "active",
    lastActive: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "admin",
    status: "active",
    lastActive: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "3",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "user",
    status: "active",
    lastActive: new Date("2024-01-14T14:20:00"),
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "4",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "moderator",
    status: "pending",
    lastActive: new Date("2024-01-10T09:15:00"),
    createdAt: new Date("2023-03-20"),
  },
  {
    id: "5",
    name: "William Kim",
    email: "william.kim@email.com",
    role: "user",
    status: "inactive",
    lastActive: new Date("2023-12-01T16:45:00"),
    createdAt: new Date("2023-04-10"),
  },
  {
    id: "6",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    role: "user",
    status: "active",
    lastActive: new Date("2024-01-15T11:00:00"),
    createdAt: new Date("2023-05-25"),
  },
  {
    id: "7",
    name: "Ganesan",
    email: "ganesan@email.com",
    role: "user",
    status: "active",
    lastActive: new Date("2024-01-15T11:00:00"),
    createdAt: new Date("2023-05-25"),
  },
  {
    id: "8",
    name: "Sneha",
    email: "sneha@email.com",
    role: "user",
    status: "active",
    lastActive: new Date("2024-01-15T11:00:00"),
    createdAt: new Date("2023-05-25"),
  },
];

/**
 * Sample transactions for the transactions table.
 */
export const transactions: Transaction[] = [
  {
    id: "txn-001",
    description: "Premium Subscription",
    amount: 299.99,
    type: "income",
    category: "Subscriptions",
    date: new Date("2024-01-15"),
    status: "completed",
  },
  {
    id: "txn-002",
    description: "Cloud Hosting",
    amount: 49.99,
    type: "expense",
    category: "Infrastructure",
    date: new Date("2024-01-14"),
    status: "completed",
  },
  {
    id: "txn-003",
    description: "Enterprise License",
    amount: 999.0,
    type: "income",
    category: "Licenses",
    date: new Date("2024-01-13"),
    status: "pending",
  },
  {
    id: "txn-004",
    description: "Marketing Campaign",
    amount: 500.0,
    type: "expense",
    category: "Marketing",
    date: new Date("2024-01-12"),
    status: "completed",
  },
  {
    id: "txn-005",
    description: "Consulting Service",
    amount: 150.0,
    type: "income",
    category: "Services",
    date: new Date("2024-01-11"),
    status: "failed",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Simulates an API delay for testing loading states.
 *
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the delay
 *
 * USAGE:
 * await simulateApiDelay(1000); // Wait 1 second
 * return data;
 */
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetches dashboard data with simulated network delay.
 * This mimics how you would structure a real API call.
 */
export const fetchDashboardData = async () => {
  await simulateApiDelay(800);

  return {
    kpis: kpiMetrics,
    revenueChart: monthlyRevenueData,
    activityChart: weeklyActivityData,
    categoryDistribution,
    users,
    transactions,
  };
};
