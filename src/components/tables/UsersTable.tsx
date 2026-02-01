/**
 * ============================================================================
 * USERS TABLE - Pre-configured Data Table for User Data
 * ============================================================================
 * 
 * This component demonstrates how to use the generic DataTable
 * with specific column configurations for user data.
 * 
 * PATTERN: Specialized Table Component
 * By creating specialized versions of the DataTable, you:
 * 1. Encapsulate column definitions
 * 2. Provide consistent styling across the app
 * 3. Add domain-specific logic (e.g., role badges, action buttons)
 */

import React from 'react';
import { MoreHorizontal, Mail, Shield, User as UserIcon } from 'lucide-react';
import { DataTable, ColumnDef } from './DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { User } from '@/types/dashboard';
import { cn } from '@/lib/utils';

// ============================================================================
// BADGE VARIANTS
// ============================================================================

/**
 * Status badge variants using design system tokens.
 * 
 * PATTERN: Map data values to UI styling.
 * This keeps styling logic centralized and consistent.
 */
const statusVariants: Record<User['status'], { 
  label: string; 
  className: string;
}> = {
  active: {
    label: 'Active',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-muted text-muted-foreground',
  },
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  },
};

const roleIcons: Record<User['role'], React.ComponentType<{ className?: string }>> = {
  admin: Shield,
  moderator: UserIcon,
  user: UserIcon,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get initials from a name for avatar fallback.
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format a date to a relative or absolute string.
 */
function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface UsersTableProps {
  /** User data to display */
  data: User[];
  /** Loading state */
  isLoading?: boolean;
  /** Handler for row click */
  onUserClick?: (user: User) => void;
  /** Handler for edit action */
  onEditUser?: (user: User) => void;
  /** Handler for delete action */
  onDeleteUser?: (user: User) => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * UsersTable Component
 * 
 * Pre-configured DataTable for displaying user records.
 * Includes custom cell renderers for avatars, badges, and action menus.
 */
export function UsersTable({
  data,
  isLoading = false,
  onUserClick,
  onEditUser,
  onDeleteUser,
}: UsersTableProps) {
  /**
   * Column definitions for the users table.
   * 
   * PATTERN: Define columns inline or extract to a separate file
   * for reuse across different views of the same data.
   */
  const columns: ColumnDef<User>[] = [
    // User info with avatar
    {
      id: 'name',
      header: 'User',
      accessorKey: 'name',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(row.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-sm text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    
    // Role with icon
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (row) => {
        const RoleIcon = roleIcons[row.role];
        return (
          <div className="flex items-center gap-2">
            <RoleIcon className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{row.role}</span>
          </div>
        );
      },
    },
    
    // Status badge
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (row) => {
        const variant = statusVariants[row.status];
        return (
          <Badge 
            variant="outline" 
            className={cn("font-normal", variant.className)}
          >
            {variant.label}
          </Badge>
        );
      },
    },
    
    // Last active date
    {
      id: 'lastActive',
      header: 'Last Active',
      accessorKey: 'lastActive',
      sortable: true,
      cell: (row) => (
        <span className="text-muted-foreground">
          {formatDate(row.lastActive)}
        </span>
      ),
    },
    
    // Actions dropdown
    {
      id: 'actions',
      header: '',
      width: '50px',
      align: 'right',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => e.stopPropagation()} // Prevent row click
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEditUser?.(row)}>
              Edit user
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => onDeleteUser?.(row)}
            >
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      searchPlaceholder="Search users..."
      searchFields={['name', 'email']}
      isLoading={isLoading}
      onRowClick={onUserClick}
      getRowId={(row) => row.id as string}
      emptyMessage="No users found. Try adjusting your search."
    />
  );
}

export default UsersTable;
