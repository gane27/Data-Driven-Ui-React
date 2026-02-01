/**
 * ============================================================================
 * USERS PAGE - User Management View
 * ============================================================================
 * 
 * Page for viewing and managing users.
 */

import React, { useState } from 'react';
import { useUsers } from '@/hooks/useDashboardData';
import { UsersTable } from '@/components/tables';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { User } from '@/types/dashboard';

export function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your users and their permissions.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <UsersTable 
        data={users || []} 
        isLoading={isLoading}
        onUserClick={setSelectedUser}
        onEditUser={(user) => console.log('Edit user:', user)}
        onDeleteUser={(user) => console.log('Delete user:', user)}
      />

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.name}</DialogTitle>
            <DialogDescription>{selectedUser?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Role</p>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedUser?.role}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedUser?.status}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Active</p>
              <p className="text-sm text-muted-foreground">
                {selectedUser?.lastActive.toLocaleString()}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UsersPage;
