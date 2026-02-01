/**
 * ============================================================================
 * APPLICATION ROUTES - Routing Configuration
 * ============================================================================
 * 
 * This file contains the main routing configuration using React Router v6.
 * 
 * REACT ROUTER CONCEPTS:
 * 
 * 1. BrowserRouter: Uses HTML5 history API for clean URLs
 * 2. Routes: Container for route definitions
 * 3. Route: Defines a path and what component to render
 * 4. Outlet: Renders child routes inside a layout
 * 5. Link/NavLink: Navigation without full page reload
 * 
 * LAYOUT PATTERN:
 * We use nested routes with a layout component:
 * 
 * <Route path="/" element={<Layout />}>      <- Layout wraps all children
 *   <Route index element={<Home />} />       <- Renders at "/"
 *   <Route path="about" element={<About />} /> <- Renders at "/about"
 * </Route>
 * 
 * The Layout component uses <Outlet /> to render child routes.
 * 
 * LEARNING RESOURCES:
 * - React Router docs: https://reactrouter.com/en/main
 * - Tutorial: https://reactrouter.com/en/main/start/tutorial
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import { DashboardPage } from "@/pages/DashboardPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { UsersPage } from "@/pages/UsersPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

// ============================================================================
// QUERY CLIENT CONFIGURATION
// ============================================================================

/**
 * React Query client configuration.
 * 
 * CONFIGURATION OPTIONS:
 * - staleTime: How long data is considered fresh
 * - gcTime: How long to keep unused data in cache
 * - retry: Number of retry attempts on failure
 * - refetchOnWindowFocus: Refetch when window regains focus
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// ============================================================================
// APP COMPONENT
// ============================================================================

/**
 * Root Application Component
 * 
 * PROVIDER PATTERN:
 * Providers are nested to give all components access to:
 * 1. QueryClientProvider: React Query context for data fetching
 * 2. TooltipProvider: Radix UI tooltip context
 * 3. BrowserRouter: React Router context for navigation
 * 
 * ORDER MATTERS: More global providers should wrap less global ones.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notifications */}
      <Toaster />
      <Sonner />
      
      {/* Router */}
      <BrowserRouter>
        <Routes>
          {/*
            NESTED ROUTES PATTERN:
            DashboardLayout renders <Outlet /> which shows the matched child route.
            This keeps the sidebar and header consistent across all pages.
          */}
          <Route path="/" element={<DashboardLayout />}>
            {/* 
              "index" route renders when the parent path exactly matches.
              "/" -> DashboardPage
            */}
            <Route index element={<DashboardPage />} />
            
            {/* Named routes render at parent path + their path */}
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* 
            CATCH-ALL ROUTE:
            The "*" path matches anything not matched above.
            Always place this last!
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
