/**
 * ============================================================================
 * ACTIVITY BAR CHART - Bar Chart Component with Recharts
 * ============================================================================
 * 
 * Demonstrates bar chart implementation with Recharts.
 * 
 * BAR CHART USE CASES:
 * - Comparing discrete categories
 * - Showing distribution across groups
 * - Visualizing rankings or comparisons
 * 
 * ACCESSIBILITY CONSIDERATIONS:
 * - Use distinct colors with sufficient contrast
 * - Provide data table alternative for screen readers
 * - Include descriptive tooltips
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartDataPoint } from '@/types/dashboard';

// ============================================================================
// CHART CONFIGURATION
// ============================================================================

const chartConfig = {
  value: {
    label: "Activity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface ActivityChartProps {
  /** Data points for the chart */
  data: ChartDataPoint[];
  /** Optional title */
  title?: string;
  /** Optional description */
  description?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Show gradient fill */
  showGradient?: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ActivityChart Component
 * 
 * FEATURES:
 * - Responsive bar chart
 * - Optional gradient fill
 * - Hover highlighting
 * - Custom tooltip
 */
export function ActivityChart({
  data,
  title = "Weekly Activity",
  description = "User engagement over the past week",
  isLoading = false,
  showGradient = true,
}: ActivityChartProps) {
  // Loading skeleton
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-60 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="flex h-[350px] items-end justify-around gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-full animate-pulse rounded-t bg-muted"
                style={{ height: `${Math.random() * 50 + 30}%` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            {/*
              SVG Definitions for gradient fill.
              PATTERN: Define gradients in <defs> and reference by ID.
            */}
            {showGradient && (
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="0%" 
                    stopColor="hsl(var(--chart-1))" 
                    stopOpacity={1} 
                  />
                  <stop 
                    offset="100%" 
                    stopColor="hsl(var(--chart-1))" 
                    stopOpacity={0.3} 
                  />
                </linearGradient>
              </defs>
            )}
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} // Only horizontal lines for cleaner look
              className="stroke-muted" 
            />
            
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              className="text-xs"
            />
            
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
            />
            
            {/*
              Bar configuration:
              - dataKey: Data property to visualize
              - fill: Bar color (can use gradient)
              - radius: Rounded corners [top-left, top-right, bottom-right, bottom-left]
              - maxBarSize: Maximum bar width
            */}
            <Bar
              dataKey="value"
              fill={showGradient ? "url(#barGradient)" : "var(--color-value)"}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ActivityChart;
