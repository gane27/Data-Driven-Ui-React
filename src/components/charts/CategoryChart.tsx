/**
 * ============================================================================
 * CATEGORY PIE CHART - Pie/Donut Chart Component with Recharts
 * ============================================================================
 * 
 * Demonstrates pie and donut chart implementation.
 * 
 * PIE CHART USE CASES:
 * - Showing parts of a whole (percentages)
 * - Comparing proportions
 * - Displaying distribution across categories
 * 
 * PIE vs BAR CHARTS:
 * - Use pie charts when showing composition (parts of 100%)
 * - Use bar charts when comparing absolute values
 * - Limit pie charts to 5-7 segments for readability
 */

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { PieChartSegment } from '@/types/dashboard';

// ============================================================================
// CHART COLORS
// ============================================================================

/**
 * Default colors using design system tokens.
 * These can be overridden by passing colors in the data.
 */
const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface CategoryChartProps {
  /** Data segments for the pie chart */
  data: PieChartSegment[];
  /** Optional title */
  title?: string;
  /** Optional description */
  description?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Show as donut (with inner radius) */
  donut?: boolean;
  /** Show legend */
  showLegend?: boolean;
}

// ============================================================================
// CUSTOM LABEL COMPONENT
// ============================================================================

/**
 * Custom label for pie segments.
 * 
 * PATTERN: Recharts allows custom label rendering for complex layouts.
 * This function receives the segment data and returns JSX.
 */
interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}

function renderCustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomLabelProps) {
  // Only show label if segment is large enough
  if (percent < 0.05) return null;
  
  // Calculate label position
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text
      x={x}
      y={y}
      fill="hsl(var(--background))"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * CategoryChart Component
 * 
 * FEATURES:
 * - Pie or donut visualization
 * - Percentage labels
 * - Interactive legend
 * - Animated segments
 */
export function CategoryChart({
  data,
  title = "Category Distribution",
  description = "Sales breakdown by category",
  isLoading = false,
  donut = true,
  showLegend = true,
}: CategoryChartProps) {
  // Build chart config from data
  const chartConfig = data.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: item.color || CHART_COLORS[index % CHART_COLORS.length],
    };
    return acc;
  }, {} as ChartConfig);

  // Loading skeleton
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-60 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="h-[250px] w-[250px] animate-pulse rounded-full bg-muted" />
        </CardContent>
      </Card>
    );
  }

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            {/*
              Pie configuration:
              - data: Array of segments
              - dataKey: Property for values
              - nameKey: Property for labels
              - cx/cy: Center position (50% = center)
              - innerRadius: > 0 creates donut
              - outerRadius: Size of the pie
              - paddingAngle: Gap between segments
            */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={donut ? 60 : 0}
              outerRadius={100}
              paddingAngle={2}
              label={renderCustomLabel}
              labelLine={false}
            >
              {/*
                Cell component applies individual styling to each segment.
                This allows unique colors per segment.
              */}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]}
                  className="stroke-background stroke-2"
                />
              ))}
            </Pie>
            
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value, name) => (
                    <div className="flex items-center gap-2">
                      <span>{name}</span>
                      <span className="font-mono font-bold">
                        {typeof value === 'number' 
                          ? `${((value / total) * 100).toFixed(1)}%` 
                          : value}
                      </span>
                    </div>
                  )}
                />
              }
            />
            
            {showLegend && (
              <ChartLegend 
                content={<ChartLegendContent nameKey="name" />} 
              />
            )}
          </PieChart>
        </ChartContainer>
        
        {/* Center label for donut charts */}
        {donut && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold">
              ${(total * 1000).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CategoryChart;
