# Data-Driven Dashboard - Learning Project

A comprehensive, well-documented React dashboard application built for learning and study purposes. This project demonstrates modern React patterns, data fetching with React Query, charting with Recharts, and component architecture best practices.

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Concepts](#key-concepts)
- [Getting Started](#getting-started)
- [Code Documentation](#code-documentation)

## 🎯 Project Overview

This dashboard application demonstrates:

1. **React 18** with TypeScript for type-safe development
2. **React Router v6** for client-side routing
3. **TanStack Query (React Query)** for server state management
4. **Recharts** for data visualization
5. **shadcn/ui + Tailwind CSS** for styling
6. **Component composition patterns** for reusable UI

## 🛠 Tech Stack

| Technology      | Purpose       | Documentation                                        |
| --------------- | ------------- | ---------------------------------------------------- |
| React 18        | UI Framework  | [react.dev](https://react.dev)                       |
| TypeScript      | Type Safety   | [typescriptlang.org](https://www.typescriptlang.org) |
| Vite            | Build Tool    | [vitejs.dev](https://vitejs.dev)                     |
| React Router v6 | Routing       | [reactrouter.com](https://reactrouter.com)           |
| TanStack Query  | Data Fetching | [tanstack.com/query](https://tanstack.com/query)     |
| Recharts        | Charts        | [recharts.org](https://recharts.org)                 |
| Tailwind CSS    | Styling       | [tailwindcss.com](https://tailwindcss.com)           |
| shadcn/ui       | UI Components | [ui.shadcn.com](https://ui.shadcn.com)               |

## 📁 Project Structure

\`\`\`
src/
├── components/
│ ├── charts/ # Chart components (Recharts)
│ │ ├── RevenueChart.tsx
│ │ ├── ActivityChart.tsx
│ │ ├── CategoryChart.tsx
│ │ └── index.ts # Barrel export
│ │
│ ├── dashboard/ # Dashboard-specific components
│ │ └── KPICard.tsx
│ │
│ ├── layout/ # Layout components
│ │ └── DashboardLayout.tsx
│ │
│ ├── tables/ # Table components
│ │ ├── DataTable.tsx
│ │ ├── UsersTable.tsx
│ │ ├── TransactionsTable.tsx
│ │ └── index.ts
│ │
│ └── ui/ # shadcn/ui components
│
├── data/
│ └── mockData.ts # Sample data for development
│
├── hooks/
│ └── useDashboardData.ts # React Query hooks
│
├── pages/ # Route components
│ ├── DashboardPage.tsx
│ ├── AnalyticsPage.tsx
│ ├── UsersPage.tsx
│ ├── TransactionsPage.tsx
│ └── SettingsPage.tsx
│
├── types/
│ └── dashboard.ts # TypeScript type definitions
│
├── lib/
│ └── utils.ts # Utility functions
│
├── App.tsx # Root component with routing
├── main.tsx # Entry point
└── index.css # Global styles & design tokens
\`\`\`

## 🔑 Key Concepts

### 1. Component Architecture

The project follows a **feature-based organization** with clear separation:

- **UI Components** (\`/components/ui\`): Generic, reusable primitives
- **Feature Components** (\`/components/charts\`, \`/components/tables\`): Domain-specific
- **Page Components** (\`/pages\`): Route-level components
- **Layout Components** (\`/components/layout\`): Page structure

### 2. Data Fetching with React Query

React Query provides:

- **Caching**: Automatic request deduplication
- **Background Updates**: Stale-while-revalidate pattern
- **Loading States**: \`isLoading\`, \`isError\`, \`data\`
- **Mutations**: \`useMutation\` for data updates

\`\`\`typescript
// Example hook usage
const { data, isLoading, error } = useDashboardData();
\`\`\`

### 3. Type-Safe Development

TypeScript interfaces define all data structures:

\`\`\`typescript
interface KPIMetric {
id: string;
title: string;
value: string;
change: number;
trend: 'up' | 'down' | 'neutral';
}
\`\`\`

### 4. Design System

Colors and styles use CSS custom properties (tokens):

\`\`\`css
/_ index.css _/
--primary: 222.2 47.4% 11.2%;
--chart-1: 221 83% 53%;
\`\`\`

\`\`\`tsx
/_ Usage in components _/

<div className="bg-primary text-primary-foreground" />
\`\`\`

### 5. Chart Components

Recharts composition pattern:

\`\`\`tsx
<LineChart data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="value" stroke="var(--color-value)" />
</LineChart>
\`\`\`

## 🚀 Getting Started

1. The project runs automatically in Dashboard preview
2. Navigate using the sidebar to explore different pages
3. All data is mock data for demonstration

## 📖 Code Documentation

Every file in this project includes extensive comments explaining:

- **WHY**: The reasoning behind design decisions
- **HOW**: Implementation details and patterns used
- **WHAT**: What each function/component does
- **LEARNING POINTS**: Key concepts to understand

### Files to Study (in order)

1. \`src/types/dashboard.ts\` - Understanding TypeScript types
2. \`src/data/mockData.ts\` - Data structure patterns
3. \`src/hooks/useDashboardData.ts\` - React Query patterns
4. \`src/components/layout/DashboardLayout.tsx\` - Layout patterns
5. \`src/components/charts/RevenueChart.tsx\` - Recharts usage
6. \`src/components/tables/DataTable.tsx\` - Generic component patterns
7. \`src/pages/DashboardPage.tsx\` - Page composition
8. \`src/App.tsx\` - Routing configuration

## 🎨 Design Patterns Used

| Pattern             | Location         | Description                         |
| ------------------- | ---------------- | ----------------------------------- |
| Compound Components | DataTable        | Related components work together    |
| Render Props        | Table cells      | Custom rendering via function props |
| Custom Hooks        | useDashboardData | Encapsulate data fetching logic     |
| Barrel Exports      | index.ts files   | Clean import statements             |
| Composition         | DashboardLayout  | Layout with Outlet for children     |
| Memoization         | KPICard          | React.memo for performance          |

## 📚 Learning Resources

- [React Docs](https://react.dev) - Official React documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [TanStack Query Docs](https://tanstack.com/query/latest) - React Query
- [Recharts Examples](https://recharts.org/en-US/examples) - Chart examples
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Utility CSS

## 🔄 Extending the Project

To add a new feature:

1. **Define types** in \`src/types/\`
2. **Add mock data** in \`src/data/mockData.ts\`
3. **Create hooks** in \`src/hooks/\`
4. **Build components** in \`src/components/\`
5. **Create page** in \`src/pages/\`
6. **Add route** in \`src/App.tsx\`

---

Developed By Ganesan Ramachandran
Date : 01-02-2026
