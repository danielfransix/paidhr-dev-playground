# Table Architecture Documentation

This document provides a technical overview of the table implementations in the codebase. The codebase currently employs two distinct architectural patterns for rendering tables, depending on the complexity and requirements of the data presentation.

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture 1: The Grid-Based Complex Table](#2-architecture-1-the-grid-based-complex-table)
   - [2.1 Layout Structure](#21-layout-structure)
   - [2.2 Scrolling & Sticky Columns](#22-scrolling--sticky-columns)
   - [2.3 Componentization (The "Cell" Pattern)](#23-componentization-the-cell-pattern)
   - [2.4 Custom Scroll Controls](#24-custom-scroll-controls)
3. [Architecture 2: The Flex-Based Simple Table](#3-architecture-2-the-flex-based-simple-table)
   - [3.1 Layout Structure](#31-layout-structure)
   - [3.2 Key Differences from Grid Architecture](#32-key-differences-from-grid-architecture)
4. [Key Technical Patterns](#4-key-technical-patterns)
   - [4.1 The "Shadow on Scroll" Hook](#41-the-shadow-on-scroll-hook)
   - [4.2 Z-Index Management](#42-z-index-management)
   - [4.3 Tailwind Usage for Layout](#43-tailwind-usage-for-layout)

## 1. Overview

The tables in this project do **not** use standard HTML `<table>` elements (`thead`, `tbody`, `tr`, `td`). Instead, they utilize modern CSS layout techniques—specifically **CSS Grid** and **Flexbox**—to achieve complex features like:

- Sticky columns with dynamic shadows
- Horizontal scrolling with custom controls
- Pixel-perfect column alignment
- Componentized cells

## 2. Architecture 1: The Grid-Based Complex Table
**Used in:** `ShiftPlanTable`, `EmployeeAssignmentTable`, `AttendanceRecordsTable`

This pattern is used for complex data sets requiring precise alignment across many columns, especially when mixing different types of cell content (checkboxes, avatars, text, status pills).

### 2.1. Layout Structure
The table is built using a series of `div` elements with Tailwind CSS Grid classes. The column widths are defined explicitly in the parent container's class.

**Example:**
```tsx
// The grid definition is shared between Header and Body rows to ensure alignment
<div className="grid grid-cols-[56px_250px_minmax(200px,1fr)_200px]">
  {/* Cells go here */}
</div>
```

### 2.2. Scrolling & Sticky Columns
This architecture implements a sophisticated "Shadow on Scroll" effect to indicate when content is scrolling behind a sticky column.

**Mechanism:**
1. **Container:** An `overflow-x-auto` container wraps the table.
2. **Ref Hook:** A `useRef` (`scrollContainerRef`) is attached to the container.
3. **Scroll Detection:** A `useEffect` hook listens to the `scroll` event.
   - It calculates if `scrollLeft > 0`.
   - Sets a `showShadow` boolean state.
4. **Visual Feedback:** The `showShadow` prop is passed to the sticky cells (`HeaderCell`, `EmployeeNameCell`, etc.), which conditionally apply a CSS `::after` pseudo-element to render a gradient shadow.

### 2.3. Componentization (The "Cell" Pattern)
Instead of generic `<div>`s, the table is composed of highly specific **Cell Components**. This encapsulates logic, styling, and behavior.

**Directory:** `src/components/shift-plan/cells/`

**Common Cell Components:**
- **`HeaderCell`**: Handles column titles, sticky positioning, and shadow rendering.
- **`CheckboxCell`**: Manages row selection state.
- **`EmployeeNameCell`**: Renders avatar, name, and initials with consistent styling.
- **`StatusCell`**: Renders colored status pills (e.g., "Late", "On Time").

**Code Pattern:**
```tsx
<div className="grid ...">
  <CheckboxCell checked={...} sticky={true} />
  <EmployeeNameCell name={...} sticky={true} showShadow={showShadow} />
  <TextCell>{...}</TextCell>
</div>
```

### 2.4. Custom Scroll Controls
For better UX on wide tables, a "Right Scroll" overlay button appears when there is hidden content to the right.

- **Logic:** `Math.ceil(scrollLeft + clientWidth) < scrollWidth` checks if the user has reached the end.
- **UI:** An absolute positioned button overlays the right edge, allowing users to click to scroll.

---

## 3. Architecture 2: The Flex-Based Simple Table
**Used in:** `RosterRow`, `TableHeader` (in `src/components/roster/`)

This pattern is lighter and used for the Roster view, where the primary layout consists of a fixed "Employee" column followed by a continuous timeline of dates.

### 3.1. Layout Structure
Instead of a rigid Grid, this uses **Flexbox**.

**Structure:**
- **Row:** `flex` container.
- **Fixed Column:** First child has a fixed width (e.g., `w-64`) and `sticky left-0`.
- **Fluid Content:** The rest of the row is a `flex-1` container that holds the date cells.

**Example:**
```tsx
<div className="flex">
  {/* Sticky Header */}
  <div className="w-64 sticky left-0 z-10 ...">
    Employee Info
  </div>
  
  {/* Scrollable Timeline */}
  <div className="flex-1 flex">
    {dates.map(date => <div className="flex-1 ...">...</div>)}
  </div>
</div>
```

### 3.2. Key Differences from Grid Architecture
- **Fluidity:** Easier to handle dynamic numbers of columns (e.g., rendering 7 days vs 30 days) without changing a CSS grid definition string.
- **Simplicity:** Does not currently implement the complex "Shadow on Scroll" state logic found in the Grid tables, relying instead on simple z-index layering.

---

## 4. Key Technical Concepts

### 4.1. The "Shadow on Scroll" Hook
Found in `ShiftPlanTable.tsx`, this logic ensures performant scroll detection.

```typescript
useEffect(() => {
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      setShowShadow(scrollLeft > 0);
    }
  };
  // ... event listeners and ResizeObserver ...
}, []);
```

### 4.2. Z-Index Management
Managing stacking contexts is crucial for sticky columns to sit *above* scrolling content.
- **Sticky Columns:** Typically `z-10` or `z-20`.
- **Dropdowns/Modals:** `z-30` or higher to appear above sticky headers.
- **Scroll Overlays:** `z-30` to sit above cell content.

### 4.3. Tailwind Usage for Layout
The codebase relies heavily on arbitrary values in Tailwind for precise control:
- `grid-cols-[56px_250px_minmax(200px,1fr)...]`
- `min-w-max` to force horizontal overflow.
- `hide-scrollbar` utility (likely in `globals.css`) for cleaner aesthetics.
