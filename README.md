# Knowix Content Review Queue - Technical Take-Home Assignment

A production-grade editorial workflow dashboard built using **Next.js (App Router), TypeScript, and Tailwind CSS**.

---

## 🛠️ Implemented Techniques & Architecture

### 1. Modern Next.js App Router Architecture
- **Client Components (`'use client'`)**: Utilized for highly interactive stateful components (managing real-time search filtering, status updates, and sliding modal drawers).
- **Type Safety (`TypeScript`)**: Comprehensive interface definitions (`ContentItem`, `ContentStatus`) ensuring strict typing across data structures, state hooks, and form events.

### 2. State Management & Optimistic Updates
- Centralized React `useState` managing mock data initialized with realistic editorial content.
- Immediate UI feedback mechanisms:
  - **Inline Status Modification**: Quickly change item status directly from the table row with auto-updating timestamps.
  - **Slide-Over Edit Drawer**: Seamlessly edit item metadata (Title, Category, Summary, Body, Status) with automatic state persistence and success toast notifications.

### 3. Advanced Filtering & Search
- **Multi-criteria filtering**: Instant filtering by status tabs (`All`, `Draft`, `In Review`, `Approved`).
- **Real-time search**: Case-insensitive substring matching across title, author, and category fields.

### 4. Responsive UI & Design System
- Styled using **Tailwind CSS** following modern design principles (neutral slate color palette, semantic status badges with high-contrast text, smooth transitions, and responsive table layouts).

---

## 🚀 Quick Start Instructions

1. **Unzip the archive**:
   ```bash
   unzip content-review-queue.zip
   cd content-review-queue
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).
