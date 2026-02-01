/**
 * ============================================================================
 * TRANSACTIONS TABLE - Financial Data Table Component
 * ============================================================================
 * 
 * Displays transaction records with income/expense indicators and status.
 */

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DataTable, ColumnDef } from './DataTable';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/types/dashboard';
import { cn } from '@/lib/utils';

// ============================================================================
// STATUS STYLING
// ============================================================================

const statusStyles: Record<Transaction['status'], {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
}> = {
  completed: { label: 'Completed', variant: 'default' },
  pending: { label: 'Pending', variant: 'secondary' },
  failed: { label: 'Failed', variant: 'destructive' },
};

// ============================================================================
// FORMAT HELPERS
// ============================================================================

/**
 * Format currency with proper sign and styling.
 */
function formatAmount(amount: number, type: 'income' | 'expense'): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  
  return type === 'expense' ? `-${formatted}` : `+${formatted}`;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface TransactionsTableProps {
  data: Transaction[];
  isLoading?: boolean;
  onTransactionClick?: (transaction: Transaction) => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TransactionsTable({
  data,
  isLoading = false,
  onTransactionClick,
}: TransactionsTableProps) {
  const columns: ColumnDef<Transaction>[] = [
    // Transaction description
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            row.type === 'income' 
              ? "bg-primary/10" 
              : "bg-destructive/10"
          )}>
            {row.type === 'income' ? (
              <ArrowUpRight className="h-4 w-4 text-primary" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            )}
          </div>
          <div>
            <p className="font-medium">{row.description}</p>
            <p className="text-sm text-muted-foreground">{row.category}</p>
          </div>
        </div>
      ),
    },
    
    // Amount
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      sortable: true,
      align: 'right',
      cell: (row) => (
        <span className={cn(
          "font-mono font-medium",
          row.type === 'income' ? "text-primary" : "text-destructive"
        )}>
          {formatAmount(row.amount, row.type)}
        </span>
      ),
    },
    
    // Date
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
      sortable: true,
      cell: (row) => (
        <span className="text-muted-foreground">
          {row.date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    
    // Status
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (row) => {
        const style = statusStyles[row.status];
        return (
          <Badge variant={style.variant}>
            {style.label}
          </Badge>
        );
      },
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchPlaceholder="Search transactions..."
      searchFields={['description', 'category']}
      isLoading={isLoading}
      onRowClick={onTransactionClick}
      getRowId={(row) => row.id as string}
    />
  );
}

export default TransactionsTable;
