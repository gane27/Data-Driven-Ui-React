/**
 * ============================================================================
 * DATA TABLE - Reusable Table Component with Sorting and Filtering
 * ============================================================================
 * 
 * A flexible, type-safe data table component for displaying tabular data.
 * 
 * DESIGN PATTERN: Compound Component
 * This table uses the compound component pattern where related components
 * work together but can be used independently. The pattern provides:
 * 1. Flexibility in layout and composition
 * 2. Reusable building blocks
 * 3. Type-safe column definitions
 * 
 * FOR PRODUCTION:
 * Consider using @tanstack/react-table for advanced features like:
 * - Virtual scrolling for large datasets
 * - Column resizing and reordering
 * - Expandable rows
 * - Pagination with server-side support
 * 
 * This implementation covers basic use cases and demonstrates the concepts.
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  Filter,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Column definition for the data table.
 * 
 * @template T - The type of data being displayed
 */
export interface ColumnDef<T> {
  /** Unique identifier for the column */
  id: string;
  /** Header text or render function */
  header: string | (() => React.ReactNode);
  /** How to extract/render the cell value */
  accessorKey?: keyof T;
  /** Custom cell renderer */
  cell?: (row: T) => React.ReactNode;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Column width (CSS value) */
  width?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

/**
 * Sort configuration state.
 */
interface SortState {
  column: string | null;
  direction: 'asc' | 'desc';
}

/**
 * DataTable component props.
 */
interface DataTableProps<T extends object> {
  /** Array of data to display */
  data: T[];
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Enable global search */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Fields to search within */
  searchFields?: (keyof T)[];
  /** Loading state */
  isLoading?: boolean;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Empty state message */
  emptyMessage?: string;
  /** Get unique key for each row */
  getRowId?: (row: T) => string;
}

// ============================================================================
// SORT ICON COMPONENT
// ============================================================================

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  if (direction === 'asc') return <ChevronUp className="h-4 w-4" />;
  if (direction === 'desc') return <ChevronDown className="h-4 w-4" />;
  return <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * DataTable Component
 * 
 * USAGE EXAMPLE:
 * ```tsx
 * const columns: ColumnDef<User>[] = [
 *   { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
 *   { id: 'email', header: 'Email', accessorKey: 'email' },
 *   { 
 *     id: 'status', 
 *     header: 'Status', 
 *     cell: (row) => <Badge>{row.status}</Badge> 
 *   },
 * ];
 * 
 * <DataTable data={users} columns={columns} searchable />
 * ```
 * 
 * STATE MANAGEMENT:
 * - Search term (controlled internally, could be lifted for URL sync)
 * - Sort state (column and direction)
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - useMemo for filtered/sorted data to avoid recalculation
 * - useCallback for event handlers to prevent child re-renders
 */
export function DataTable<T extends object>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  searchFields,
  isLoading = false,
  onRowClick,
  emptyMessage = "No results found.",
  getRowId,
}: DataTableProps<T>) {
  // ========================================================================
  // STATE
  // ========================================================================
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: 'asc',
  });

  // ========================================================================
  // SORTING LOGIC
  // ========================================================================
  
  /**
   * Handle column header click for sorting.
   * 
   * SORT CYCLE: none -> asc -> desc -> none
   */
  const handleSort = useCallback((columnId: string) => {
    setSortState((prev) => {
      if (prev.column !== columnId) {
        // New column: start with ascending
        return { column: columnId, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        // Same column, was asc: switch to desc
        return { column: columnId, direction: 'desc' };
      }
      // Same column, was desc: clear sort
      return { column: null, direction: 'asc' };
    });
  }, []);

  // ========================================================================
  // DATA PROCESSING
  // ========================================================================
  
  /**
   * Filter and sort data based on current state.
   * 
   * MEMOIZATION: useMemo prevents recalculation on every render.
   * Only recalculates when data, searchTerm, or sortState changes.
   */
  const processedData = useMemo(() => {
    let result = [...data];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const fieldsToSearch = searchFields || 
        (columns
          .filter(col => col.accessorKey)
          .map(col => col.accessorKey) as (keyof T)[]);
      
      result = result.filter((row) =>
        fieldsToSearch.some((field) => {
          const value = row[field];
          return value != null && 
            String(value).toLowerCase().includes(searchLower);
        })
      );
    }
    
    // Apply sorting
    if (sortState.column) {
      const column = columns.find((col) => col.id === sortState.column);
      const accessor = column?.accessorKey;
      
      if (accessor) {
        result.sort((a, b) => {
          const aValue = a[accessor];
          const bValue = b[accessor];
          
          // Handle null/undefined
          if (aValue == null && bValue == null) return 0;
          if (aValue == null) return sortState.direction === 'asc' ? -1 : 1;
          if (bValue == null) return sortState.direction === 'asc' ? 1 : -1;
          
          // Compare values
          let comparison = 0;
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            comparison = aValue.localeCompare(bValue);
          } else if (aValue instanceof Date && bValue instanceof Date) {
            comparison = aValue.getTime() - bValue.getTime();
          } else {
            comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          }
          
          return sortState.direction === 'asc' ? comparison : -comparison;
        });
      }
    }
    
    return result;
  }, [data, searchTerm, sortState, columns, searchFields]);

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================
  
  /**
   * Render a cell value based on column definition.
   */
  const renderCell = (row: T, column: ColumnDef<T>) => {
    // Custom cell renderer
    if (column.cell) {
      return column.cell(row);
    }
    
    // Default: use accessor key
    if (column.accessorKey) {
      const value = row[column.accessorKey];
      
      // Format dates
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }
      
      return String(value ?? '');
    }
    
    return null;
  };

  // ========================================================================
  // LOADING STATE
  // ========================================================================
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {searchable && (
          <div className="h-10 w-64 animate-pulse rounded-md bg-muted" />
        )}
        <div className="rounded-md border">
          <div className="h-12 animate-pulse border-b bg-muted/50" />
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="h-16 animate-pulse border-b bg-muted/20 last:border-0" 
            />
          ))}
        </div>
      </div>
    );
  }

  // ========================================================================
  // MAIN RENDER
  // ========================================================================
  
  return (
    <div className="space-y-4">
      {/* Search bar */}
      {searchable && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const isSorted = sortState.column === column.id;
                
                return (
                  <TableHead
                    key={column.id}
                    style={{ width: column.width }}
                    className={cn(
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right'
                    )}
                  >
                    {column.sortable ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 hover:bg-transparent"
                        onClick={() => handleSort(column.id)}
                      >
                        {typeof column.header === 'function' 
                          ? column.header() 
                          : column.header}
                        <SortIcon 
                          direction={isSorted ? sortState.direction : null} 
                        />
                      </Button>
                    ) : (
                      typeof column.header === 'function' 
                        ? column.header() 
                        : column.header
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {processedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((row, index) => {
                const rowKey = getRowId 
                  ? getRowId(row) 
                  : ('id' in row ? String(row.id) : index.toString());
                
                return (
                  <TableRow
                    key={rowKey}
                    className={cn(
                      onRowClick && "cursor-pointer hover:bg-muted/50"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        className={cn(
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {renderCell(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {processedData.length} of {data.length} results
      </div>
    </div>
  );
}

export default DataTable;
