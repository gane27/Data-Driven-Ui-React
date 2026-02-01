/**
 * ============================================================================
 * KPI CARD - Key Performance Indicator Display Component
 * ============================================================================
 * 
 * A reusable card component for displaying key metrics with trend indicators.
 * 
 * DESIGN PRINCIPLES:
 * 1. Single Responsibility: Only displays KPI data
 * 2. Composability: Built from smaller components (Card, icons)
 * 3. Accessibility: Semantic HTML, screen reader support
 * 4. Performance: Minimal re-renders through proper memoization
 * 
 * USAGE:
 * <KPICard
 *   title="Revenue"
 *   value="$45,231.89"
 *   change={20.1}
 *   trend="up"
 *   icon={DollarSign}
 * />
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface KPICardProps {
  /** The metric title/label */
  title: string;
  /** The current value (pre-formatted) */
  value: string;
  /** Percentage change from previous period */
  change: number;
  /** Direction of the trend */
  trend: 'up' | 'down' | 'neutral';
  /** Optional icon to display */
  icon?: React.ComponentType<{ className?: string }>;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// TREND ICON COMPONENT
// ============================================================================

/**
 * Renders the appropriate trend icon based on direction.
 * 
 * PATTERN: This could be extracted to a separate file for reuse.
 * It's kept here for demonstration purposes.
 */
function TrendIcon({ trend }: { trend: 'up' | 'down' | 'neutral' }) {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4" />;
    case 'down':
      return <TrendingDown className="h-4 w-4" />;
    default:
      return <Minus className="h-4 w-4" />;
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * KPICard Component
 * 
 * MEMOIZATION NOTE:
 * React.memo is used here to prevent unnecessary re-renders when parent
 * components update. The component will only re-render if its props change.
 * 
 * WHEN TO USE React.memo:
 * - Component renders often with same props
 * - Component has expensive render logic
 * - Component is a leaf node in the tree
 */
export const KPICard = React.memo(function KPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  className,
}: KPICardProps) {
  // Determine trend color using semantic design tokens
  const trendColorClass = {
    up: 'text-green-600 dark:text-green-400',      // Positive trend
    down: 'text-destructive',                        // Negative trend
    neutral: 'text-muted-foreground',               // No change
  }[trend];
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* Title with smaller text for hierarchy */}
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        
        {/* Optional icon with muted styling */}
        {Icon && (
          <div className="rounded-md bg-muted p-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {/* Main value - largest text for visual hierarchy */}
        <div className="text-2xl font-bold">{value}</div>
        
        {/* Trend indicator */}
        <div className={cn("mt-1 flex items-center gap-1 text-xs", trendColorClass)}>
          <TrendIcon trend={trend} />
          <span>
            {/* Format change with + for positive, - for negative */}
            {change > 0 ? '+' : ''}{change}% from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
});

/**
 * Loading skeleton for KPICard.
 * 
 * SKELETON PATTERN:
 * Provide loading states that match the final layout to prevent
 * layout shifts and improve perceived performance.
 */
export function KPICardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-40 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}

export default KPICard;
