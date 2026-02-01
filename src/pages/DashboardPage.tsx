/**
 * ============================================================================
 * DASHBOARD PAGE - Main Dashboard View
 * ============================================================================
 * 
 * This is the main dashboard page that brings together all components.
 * It demonstrates:
 * 
 * 1. Data fetching with React Query hooks
 * 2. Grid layouts with responsive design
 * 3. Component composition patterns
 * 4. Loading states and error handling
 * 
 * PAGE STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  Page Header                                                    │
 * │  - Title, Description, Action buttons                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  KPI Cards Grid (4 columns on desktop)                         │
 * │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
 * │  │ Revenue  │ │ Users    │ │ Sales    │ │ Active   │          │
 * │  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  Charts Grid (2 columns)                                        │
 * │  ┌────────────────────────┐ ┌────────────────────────┐         │
 * │  │    Revenue Chart       │ │    Activity Chart      │         │
 * │  └────────────────────────┘ └────────────────────────┘         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  Bottom Section (2 columns)                                     │
 * │  ┌────────────────────────┐ ┌────────────────────────┐         │
 * │  │    Pie Chart           │ │    Recent Transactions │         │
 * │  └────────────────────────┘ └────────────────────────┘         │
 * └─────────────────────────────────────────────────────────────────┘
 */

import React from 'react';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { KPICard, KPICardSkeleton } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { ActivityChart } from '@/components/charts/ActivityChart';
import { CategoryChart } from '@/components/charts/CategoryChart';
import { TransactionsTable } from '@/components/tables';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ============================================================================
// ICON MAPPING
// ============================================================================

/**
 * Map icon names to Lucide components.
 * 
 * PATTERN: This allows icon names to be stored in data (e.g., database)
 * and dynamically rendered.
 */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DollarSign,
  Users,
  CreditCard,
  Activity,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Dashboard Page Component
 * 
 * DATA FLOW:
 * 1. useDashboardData hook fetches all data via React Query
 * 2. While loading, skeleton states are shown
 * 3. On success, data is passed to child components
 * 4. React Query handles caching and background updates
 * 
 * PERFORMANCE TIPS:
 * - Components only re-render when their specific data changes
 * - React Query deduplicates concurrent requests
 * - Stale-while-revalidate pattern keeps UI responsive
 */
export function DashboardPage() {
  // Fetch all dashboard data with a single hook
  const { data, isLoading, error } = useDashboardData();

  // ========================================================================
  // ERROR STATE
  // ========================================================================
  
  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">
            Error loading dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER
  // ========================================================================
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>Download Report</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <section aria-label="Key Performance Indicators">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading || !data ? (
            // Loading skeletons
            [...Array(4)].map((_, i) => <KPICardSkeleton key={i} />)
          ) : (
            // Render KPI cards with data
            data.kpis.map((kpi) => {
              const Icon = iconMap[kpi.icon || ''];
              return (
                <KPICard
                  key={kpi.id}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  trend={kpi.trend}
                  icon={Icon}
                />
              );
            })
          )}
        </div>
      </section>

      {/* Charts Row */}
      <section aria-label="Charts">
        <div className="grid gap-4 lg:grid-cols-2">
          <RevenueChart 
            data={data?.revenueChart || []} 
            isLoading={isLoading}
          />
          <ActivityChart 
            data={data?.activityChart || []} 
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Bottom Section - Pie Chart and Transactions */}
      <section aria-label="Additional Data">
        <div className="grid gap-4 lg:grid-cols-7">
          {/* Pie chart takes 3 columns */}
          <div className="lg:col-span-3">
            <CategoryChart 
              data={data?.categoryDistribution || []} 
              isLoading={isLoading}
            />
          </div>
          
          {/* Transactions table takes 4 columns */}
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionsTable 
                  data={data?.transactions.slice(0, 5) || []} 
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
