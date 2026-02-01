/**
 * ============================================================================
 * DASHBOARD LAYOUT - Main Layout Component with Sidebar
 * ============================================================================
 *
 * This component provides the main layout structure for the dashboard,
 * including a responsive sidebar navigation and content area.
 *
 * LAYOUT PATTERN:
 * ┌─────────────────────────────────────────────────────────┐
 * │  Sidebar (fixed)  │        Main Content (scrollable)   │
 * │                   │  ┌─────────────────────────────┐   │
 * │  - Logo           │  │         Header              │   │
 * │  - Navigation     │  ├─────────────────────────────┤   │
 * │  - User Menu      │  │                             │   │
 * │                   │  │         Page Content        │   │
 * │                   │  │         (Outlet)            │   │
 * │                   │  │                             │   │
 * │                   │  └─────────────────────────────┘   │
 * └─────────────────────────────────────────────────────────┘
 *
 * RESPONSIVE BEHAVIOR:
 * - Desktop: Sidebar always visible
 * - Mobile: Sidebar hidden, hamburger menu to open
 */

import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  UserCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

/**
 * Navigation items configuration.
 *
 * PATTERN: Centralizing navigation config makes it easy to:
 * 1. Add/remove navigation items
 * 2. Implement role-based navigation
 * 3. Test navigation in isolation
 */
const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Sidebar component with navigation links.
 *
 * ACCESSIBILITY:
 * - Uses semantic nav element
 * - Current page indicated with aria-current
 * - Keyboard navigable links
 */
function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay - closes sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Base styles
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card",
          // Mobile: slide in/out
          "transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo/Brand */}
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="h-5 w-5" />
            </div>
            <span className="text-lg">Dashboard</span>
          </Link>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose} // Close mobile sidebar on navigation
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      // Base styles
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      // Hover state
                      "hover:bg-accent hover:text-accent-foreground",
                      // Active state - uses semantic tokens
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section at bottom */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <UserCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 text-sm">
              <p className="font-medium">Ganesan</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * Header component with search and user actions.
 */
function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search bar */}
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-9" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">View notifications</span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// ============================================================================
// MAIN LAYOUT COMPONENT
// ============================================================================

/**
 * Main dashboard layout component.
 *
 * COMPONENT COMPOSITION:
 * This layout uses React Router's <Outlet /> to render child routes.
 * The layout wraps all dashboard pages with consistent navigation.
 *
 * STATE MANAGEMENT:
 * - Sidebar open/close state is local (useState)
 * - For more complex state, consider useReducer or a state library
 */
export function DashboardLayout() {
  // State for mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area - offset for sidebar on desktop */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {/* 
            Outlet renders the matched child route.
            See React Router docs: https://reactrouter.com/en/main/components/outlet
          */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
