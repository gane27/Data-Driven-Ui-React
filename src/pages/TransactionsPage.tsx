/**
 * ============================================================================
 * TRANSACTIONS PAGE - Financial Transactions View
 * ============================================================================
 */

import React from 'react';
import { useTransactions } from '@/hooks/useDashboardData';
import { TransactionsTable } from '@/components/tables';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';

export function TransactionsPage() {
  const { data: transactions, isLoading } = useTransactions();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage all financial transactions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionsTable 
        data={transactions || []} 
        isLoading={isLoading}
        onTransactionClick={(tx) => console.log('Transaction clicked:', tx)}
      />
    </div>
  );
}

export default TransactionsPage;
