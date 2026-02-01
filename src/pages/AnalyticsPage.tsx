/**
 * ============================================================================
 * ANALYTICS PAGE - Detailed Analytics View
 * ============================================================================
 * 
 * A page dedicated to more detailed analytics and data exploration.
 */

import React from 'react';
import { useRevenueChartData, useActivityChartData, useCategoryDistribution } from '@/hooks/useDashboardData';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { ActivityChart } from '@/components/charts/ActivityChart';
import { CategoryChart } from '@/components/charts/CategoryChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AnalyticsPage() {
  const { data: revenueData, isLoading: revenueLoading } = useRevenueChartData();
  const { data: activityData, isLoading: activityLoading } = useActivityChartData();
  const { data: categoryData, isLoading: categoryLoading } = useCategoryDistribution();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights and trends for your business.
        </p>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <RevenueChart 
              data={revenueData || []} 
              isLoading={revenueLoading}
              title="Revenue Trend"
              description="Monthly revenue comparison with last year"
            />
            <ActivityChart 
              data={activityData || []} 
              isLoading={activityLoading}
              title="User Activity"
              description="Daily active users this week"
            />
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <RevenueChart 
            data={revenueData || []} 
            isLoading={revenueLoading}
            title="Detailed Revenue Analysis"
            description="Year-over-year revenue comparison by month"
            height={400}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Insights</CardTitle>
              <CardDescription>Key takeaways from your revenue data</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Revenue has grown 25% compared to last year</li>
                <li>• Q4 shows the strongest performance</li>
                <li>• Summer months show consistent growth patterns</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <CategoryChart 
              data={categoryData || []} 
              isLoading={categoryLoading}
              title="Sales by Category"
              description="Distribution of sales across product categories"
              donut
            />
            <CategoryChart 
              data={categoryData || []} 
              isLoading={categoryLoading}
              title="Category Breakdown"
              description="Pie chart view of categories"
              donut={false}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AnalyticsPage;
