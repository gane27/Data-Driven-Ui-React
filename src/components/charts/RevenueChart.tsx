/**
 * ============================================================================
 * REVENUE CHART - Line Chart Component with Recharts
 * ============================================================================
 * 
 * This component demonstrates how to build a line chart using Recharts.
 * 
 * RECHARTS OVERVIEW:
 * Recharts is a composable charting library built on React components.
 * Each chart is composed of smaller components like:
 * - ResponsiveContainer: Makes chart responsive
 * - XAxis, YAxis: Axis configuration
 * - Tooltip: Hover information
 * - Line, Bar, Area: Data visualization
 * 
 * LEARNING RESOURCES:
 * - Recharts docs: https://recharts.org/en-US/
 * - API reference: https://recharts.org/en-US/api
 * 
 * INTEGRATION WITH SHADCN/UI:
 * This uses the ChartContainer from shadcn/ui which provides:
 * - Consistent theming
 * - Responsive container
 * - Type-safe config
 */

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

/**
 * Chart configuration for theming.
 * 
 * PATTERN: Define chart colors using CSS custom properties
 * to ensure consistency with the design system.
 */
const chartConfig = {
  value: {
    label: "This Year",
    color: "hsl(var(--chart-1))",
  },
  previousValue: {
    label: "Last Year",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface RevenueChartProps {
  /** Data points for the chart */
  data: ChartDataPoint[];
  /** Optional title override */
  title?: string;
  /** Optional description */
  description?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Chart height */
  height?: number;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * RevenueChart Component
 * 
 * COMPONENT STRUCTURE:
 * ┌─────────────────────────────────────────┐
 * │  CardHeader                             │
 * │  - Title                                │
 * │  - Description                          │
 * ├─────────────────────────────────────────┤
 * │  CardContent                            │
 * │  ┌─────────────────────────────────┐   │
 * │  │  ChartContainer                 │   │
 * │  │  - LineChart                    │   │
 * │  │    - CartesianGrid              │   │
 * │  │    - XAxis                      │   │
 * │  │    - YAxis                      │   │
 * │  │    - Tooltip                    │   │
 * │  │    - Line (current)             │   │
 * │  │    - Line (previous)            │   │
 * │  └─────────────────────────────────┘   │
 * └─────────────────────────────────────────┘
 */
export function RevenueChart({
  data,
  title = "Revenue Overview",
  description = "Comparing revenue to the previous period",
  isLoading = false,
  height = 350,
}: RevenueChartProps) {
  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-60 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div 
            className="animate-pulse rounded bg-muted" 
            style={{ height }} 
          />
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
        {/*
          ChartContainer provides:
          1. ResponsiveContainer wrapper for fluid sizing
          2. Theme-aware colors via CSS variables
          3. Consistent styling across all charts
        */}
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            {/*
              CartesianGrid adds background grid lines.
              strokeDasharray creates dashed lines for subtlety.
            */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="stroke-muted" 
            />
            
            {/*
              XAxis configuration:
              - dataKey: Which property to use for labels
              - tickLine: Show/hide tick marks
              - axisLine: Show/hide axis line
              - tickMargin: Space between labels and axis
            */}
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />
            
            {/*
              YAxis configuration:
              - tickFormatter: Format numbers (e.g., add $ or K suffix)
              - width: Fixed width for alignment
            */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              className="text-xs"
            />
            
            {/*
              ChartTooltip from shadcn/ui provides a styled tooltip.
              The content prop uses ChartTooltipContent for formatting.
            */}
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            
            {/*
              Line component configuration:
              - type: Curve type (monotone = smooth curve)
              - dataKey: Which data property to visualize
              - stroke: Line color (uses CSS variable via config)
              - strokeWidth: Line thickness
              - dot: Show/hide data points
              - activeDot: Styling for hovered point
            */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                className: "fill-primary",
              }}
            />
            
            {/* Second line for comparison */}
            <Line
              type="monotone"
              dataKey="previousValue"
              stroke="var(--color-previousValue)"
              strokeWidth={2}
              strokeDasharray="5 5" // Dashed line for visual distinction
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
