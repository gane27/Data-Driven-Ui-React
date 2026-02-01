/**
 * ============================================================================
 * CHARTS INDEX - Barrel Export File
 * ============================================================================
 * 
 * This file re-exports all chart components for cleaner imports.
 * 
 * BARREL EXPORT PATTERN:
 * Instead of importing each component individually:
 *   import { RevenueChart } from '@/components/charts/RevenueChart';
 *   import { ActivityChart } from '@/components/charts/ActivityChart';
 * 
 * You can import from a single location:
 *   import { RevenueChart, ActivityChart } from '@/components/charts';
 * 
 * BENEFITS:
 * 1. Cleaner, more organized imports
 * 2. Easier refactoring (change internal structure without updating consumers)
 * 3. Single point of documentation for module
 * 
 * CONSIDERATIONS:
 * - Be mindful of tree-shaking; some bundlers may include all exports
 * - For very large component libraries, consider lazy loading
 */

// Named exports for individual component access
export { RevenueChart } from './RevenueChart';
export { ActivityChart } from './ActivityChart';
export { CategoryChart } from './CategoryChart';

// Default exports are not re-exported to avoid confusion
// Use named exports for consistency
