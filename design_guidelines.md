# Data Warehousing Application - Design Guidelines

## Design Approach
**Selected Framework:** Carbon Design System  
**Rationale:** Carbon is purpose-built for data-heavy enterprise applications, providing robust patterns for tables, data visualization, and complex workflows. This aligns perfectly with the utility-focused, information-dense nature of a data warehousing application.

## Core Design Principles
1. **Data First:** Information hierarchy prioritizes data accessibility and readability
2. **Scannable Interface:** Dense information presented with clear visual structure
3. **Functional Efficiency:** Every pixel serves the user's workflow
4. **Enterprise Reliability:** Professional, stable visual language that builds trust

---

## Typography System

### Font Families
- **Primary:** 'IBM Plex Sans' via Google Fonts CDN
- **Monospace:** 'IBM Plex Mono' for data values, SKU codes, and numerical displays

### Type Scale
- **Page Title:** 2rem (32px), font-weight 600
- **Section Headers:** 1.5rem (24px), font-weight 600
- **Card/Panel Titles:** 1.125rem (18px), font-weight 500
- **Body Text:** 0.875rem (14px), font-weight 400
- **Data Labels:** 0.75rem (12px), font-weight 500, uppercase, letter-spacing 0.5px
- **Data Values:** 0.875rem (14px), font-weight 500, font-family monospace
- **Helper Text:** 0.75rem (12px), font-weight 400

---

## Layout System

### Spacing Primitives
**Core Units:** Tailwind spacing 2, 4, 6, 8, 12, 16  
- Component padding: `p-4` to `p-6`
- Section spacing: `gap-6` to `gap-8`
- Card spacing: `p-6`
- Grid gaps: `gap-4`
- Button padding: `px-4 py-2`

### Application Structure
```
┌─────────────────────────────────────────┐
│ Top Navigation Bar (h-16)              │
├─────────────────────────────────────────┤
│ ┌──────────────┬────────────────────┐  │
│ │ Sidebar      │ Main Content Area  │  │
│ │ (w-64)       │ (flex-1)           │  │
│ │              │                    │  │
│ │ - Search     │ - Page Header      │  │
│ │ - Quick      │ - SKU Search Input │  │
│ │   Actions    │ - Data Grids       │  │
│ │ - Filters    │ - Charts           │  │
│ │              │ - Tables           │  │
│ └──────────────┴────────────────────┘  │
└─────────────────────────────────────────┘
```

### Grid Layouts
- **Dashboard Cards:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Metrics Row:** `grid grid-cols-2 md:grid-cols-4 gap-4`
- **Chart Grid:** `grid grid-cols-1 lg:grid-cols-2 gap-6`
- **Content Width:** `max-w-full px-6` for main content

---

## Component Library

### 1. Navigation Components

**Top Navigation Bar**
- Height: `h-16`
- Contains: Logo (left), Global search (center), User menu (right)
- Layout: `flex items-center justify-between px-6`
- Border bottom: `border-b`

**Sidebar Navigation**
- Width: `w-64` (desktop), collapsible on mobile
- Padding: `p-4`
- Menu items: `py-3 px-4 rounded-lg` with hover state
- Active state: slight background treatment
- Icons: Heroicons (outline style, size-6)

### 2. Search & Input Components

**SKU Search Input**
- Full-width with autocomplete dropdown
- Height: `h-12`
- Padding: `px-4`
- Icon: Magnifying glass (Heroicons, size-5) positioned left
- Rounded: `rounded-lg`
- Border: `border-2`
- Focus: Enhanced border treatment

**Filter Controls**
- Inline filter pills: `rounded-full px-4 py-2 text-sm`
- Dropdown filters: `rounded-lg border` with chevron icon
- Date pickers: Standard input with calendar icon

### 3. Data Grid Components

**Primary Data Table**
- Container: `rounded-lg border overflow-hidden`
- Header row: `sticky top-0` with enhanced weight
- Cell padding: `px-4 py-3`
- Row height: Minimum `h-12`
- Row hover: Subtle background shift
- Borders: `border-b` between rows

**Table Features:**
- **Sortable Headers:** Chevron up/down icons (Heroicons size-4) on right
- **Column Filters:** Filter icon button in header, opens dropdown
- **Checkboxes:** Left column for row selection (`size-4` checkboxes)
- **Actions Column:** Right-aligned with icon buttons (Edit, View, Delete)
- **Pagination:** Bottom of table, centered, showing "Showing 1-20 of 156"

**Grid Toolbar**
- Position: Above table, `flex justify-between items-center mb-4`
- Left: Bulk actions (Export CSV, Export Excel buttons)
- Right: Search, filters, view toggles
- Buttons: `px-4 py-2 rounded-lg` with icons from Heroicons

### 4. Chart Components

**Chart Cards**
- Container: `rounded-lg border p-6`
- Title: `text-lg font-semibold mb-4`
- Chart height: `h-64` to `h-80`
- Library: Chart.js via CDN
- Types: Line charts (trends), Bar charts (comparisons), Donut charts (distributions)
- Legend: Bottom placement with `gap-4` spacing

### 5. Information Cards

**Metric Cards**
- Layout: `rounded-lg border p-6`
- Structure (vertical):
  - Label: `text-xs uppercase font-medium mb-2`
  - Value: `text-3xl font-semibold font-mono`
  - Change indicator: `text-sm mt-2` with up/down arrow
- Icon: Top-right corner (Heroicons size-8)

**Detail Cards**
- Multi-section layout with `space-y-4`
- Section headers: `text-sm font-medium uppercase mb-2`
- Key-value pairs: `flex justify-between py-2 border-b`

### 6. Modal Pop-ups

**Modal Structure**
- Overlay: Full screen with backdrop blur
- Container: `max-w-4xl mx-auto mt-20 rounded-lg`
- Padding: `p-6` to `p-8`
- Header: `flex justify-between items-center mb-6`
  - Title: `text-2xl font-semibold`
  - Close button: X icon (Heroicons size-6)
- Content area: Scrollable with `max-h-[70vh] overflow-y-auto`
- Footer: Action buttons right-aligned `mt-6`

**Modal Types:**
- **Detail View:** Full SKU information with tabs
- **Order Details:** Table of line items + summary
- **Analytics Expanded:** Larger chart with detailed metrics

### 7. Form Elements

**Input Fields**
- Height: `h-12`
- Padding: `px-4`
- Rounded: `rounded-lg`
- Border: `border-2`
- Label: `block text-sm font-medium mb-2`

**Buttons**
- Primary: `px-6 py-3 rounded-lg font-medium`
- Secondary: Same with border variant
- Icon buttons: `p-3 rounded-lg` (square)
- Disabled state: Reduced opacity

**Select Dropdowns**
- Match input styling with chevron icon right

### 8. Badges & Status Indicators

**Status Badges**
- Padding: `px-3 py-1 rounded-full text-xs font-medium`
- Variants: Success, Warning, Error, Info, Neutral
- Icon optional: Dot or small icon (Heroicons size-3)

**Count Badges**
- Small circular: `size-6 rounded-full flex items-center justify-center text-xs font-semibold`

---

## Data Visualization Guidelines

**Chart Color Sequence:** Use a professional palette with 8-10 distinct values
**Grid Lines:** Subtle, minimal weight
**Axis Labels:** `text-xs` size
**Tooltips:** `rounded-lg px-3 py-2` with shadow, font-mono for values
**Legends:** Horizontal layout with `gap-4`, clickable to toggle series

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px - Collapse sidebar, stack cards, horizontal scroll tables
- Tablet: 768px - 1024px - 2-column layouts, persistent sidebar
- Desktop: > 1024px - Full 3-column layouts, expanded data views

**Mobile Optimizations:**
- Cards: `rounded-lg` containers with full-width data
- Tables: Horizontal scroll with `overflow-x-auto`
- Charts: Maintain aspect ratio, scale down gracefully
- Modals: Full screen on mobile

---

## Interaction Patterns

**Loading States:** Skeleton screens matching component structure
**Empty States:** Centered icon + message + action button
**Error States:** Alert banner with icon and clear message
**Success Feedback:** Toast notification top-right, auto-dismiss 3s
**Hover States:** Subtle background shifts, no dramatic effects
**Focus States:** Enhanced border treatment for keyboard navigation

---

## Icons
**Library:** Heroicons (via CDN, outline style)
**Sizes:** size-4 (inline), size-5 (inputs), size-6 (buttons), size-8 (decorative)
**Usage:** Search, filter, sort indicators, status icons, action buttons

---

## Accessibility
- Keyboard navigation: Full tab order through interactive elements
- ARIA labels: All icon buttons and interactive elements
- Focus indicators: Clear visible outlines
- Form labels: Programmatically associated with inputs
- Color contrast: Meets WCAG AA standards for all text
- Screen reader: Meaningful alt text and announcements

This design creates a professional, data-centric interface optimized for power users managing complex inventory and SKU data efficiently.