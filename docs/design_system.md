# Synkria Design System

## Design Philosophy
- **Minimalist**: Clean, uncluttered layouts with purposeful whitespace
- **Professional**: Sophisticated color palette and typography
- **Eye-catching**: Subtle gradients, smooth animations, and modern interactions
- **Uniform**: Consistent patterns across all pages
- **AI-friendly**: Well-structured, semantic HTML with clear class naming

## Color Palette

### Primary Colors
```css
/* Tailwind Custom Colors */
primary-50: #f0f4ff
primary-100: #e0e9ff
primary-200: #c7d6fe
primary-300: #a5b8fc
primary-400: #8b93f8
primary-500: #7c6df0  /* Main brand color */
primary-600: #6d4de8
primary-700: #5b3bd5
primary-800: #4c32b3
primary-900: #402b8f

secondary-50: #fdf2f8
secondary-100: #fce7f3
secondary-200: #fbcfe8
secondary-300: #f9a8d4
secondary-400: #f472b6
secondary-500: #ec4899  /* Accent color */
secondary-600: #db2777
secondary-700: #be185d
secondary-800: #9d174d
secondary-900: #831843
```

### Neutral Colors
```css
gray-50: #f8fafc
gray-100: #f1f5f9
gray-200: #e2e8f0
gray-300: #cbd5e1
gray-400: #94a3b8
gray-500: #64748b
gray-600: #475569
gray-700: #334155
gray-800: #1e293b
gray-900: #0f172a
```

### Background Colors
- Light mode: `bg-white`, `bg-gray-50`
- Dark mode: `bg-gray-900`, `bg-gray-800`
- Gradient backgrounds: `bg-gradient-to-br from-primary-500 to-secondary-500`

## Typography

### Font Stack
- **Primary**: Inter (body text, UI elements)
- **Secondary**: Playfair Display (headings, brand text)

### Type Scale
```css
/* Headings */
.text-display: 4rem (64px) - Hero titles
.text-h1: 3rem (48px) - Page titles
.text-h2: 2.25rem (36px) - Section titles
.text-h3: 1.875rem (30px) - Subsection titles
.text-h4: 1.5rem (24px) - Card titles
.text-h5: 1.25rem (20px) - Small headings
.text-h6: 1.125rem (18px) - Labels

/* Body Text */
.text-lg: 1.125rem (18px) - Large body text
.text-base: 1rem (16px) - Default body text
.text-sm: 0.875rem (14px) - Small text
.text-xs: 0.75rem (12px) - Captions
```

### Font Weights
- `font-light` (300): Light text
- `font-normal` (400): Body text
- `font-medium` (500): Emphasized text
- `font-semibold` (600): Subheadings
- `font-bold` (700): Headings
- `font-extrabold` (800): Display text

## Spacing System

### Consistent Spacing Scale
- `space-1`: 0.25rem (4px)
- `space-2`: 0.5rem (8px)
- `space-3`: 0.75rem (12px)
- `space-4`: 1rem (16px)
- `space-6`: 1.5rem (24px)
- `space-8`: 2rem (32px)
- `space-12`: 3rem (48px)
- `space-16`: 4rem (64px)
- `space-20`: 5rem (80px)
- `space-24`: 6rem (96px)

### Section Spacing
- Hero sections: `py-24 lg:py-32`
- Content sections: `py-16 lg:py-20`
- Card padding: `p-6 lg:p-8`
- Button padding: `px-6 py-3`

## Component Architecture

### 1. Navigation Component
```html
<!-- Flowbite Navbar with custom styling -->
<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50 transition-all duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Navigation content -->
  </div>
</nav>
```

### 2. Hero Components
```html
<!-- Animated Hero Section -->
<section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 overflow-hidden">
  <div class="absolute inset-0 bg-black/20"></div>
  <div class="relative z-10 text-center text-white">
    <!-- Hero content -->
  </div>
  <!-- Animated background elements -->
</section>
```

### 3. Card Components
```html
<!-- Feature Card -->
<div class="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
  <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
    <i class="fas fa-icon text-white"></i>
  </div>
  <h3 class="text-xl font-semibold text-gray-900 mb-2">Card Title</h3>
  <p class="text-gray-600">Card description</p>
</div>
```

### 4. Button Components
```html
<!-- Primary Button -->
<button class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
  <span>Button Text</span>
  <i class="fas fa-arrow-right ml-2"></i>
</button>

<!-- Secondary Button -->
<button class="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-xl border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
  <span>Button Text</span>
</button>
```

### 5. Modal Components (Flowbite)
```html
<!-- Modal using Flowbite -->
<div id="modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
      <!-- Modal content -->
    </div>
  </div>
</div>
```

## Animation Patterns

### 1. Page Load Animations
- Staggered fade-in for content sections
- Hero text typing/reveal effects
- Smooth entrance animations for cards

### 2. Scroll Animations
- Parallax effects for background elements
- Fade-in animations triggered by scroll position
- Progressive disclosure of content

### 3. Hover Interactions
- Subtle scale transforms (1.02-1.05)
- Shadow elevation changes
- Color transitions
- Icon rotations/movements

### 4. Micro-interactions
- Button ripple effects
- Loading states with spinners
- Form validation feedback
- Toast notifications

## Responsive Design

### Breakpoints (Tailwind defaults)
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactive elements (min 44px)
- Optimized typography scaling

## Accessibility

### Color Contrast
- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text
- Focus indicators with high contrast

### Interactive Elements
- Keyboard navigation support
- Screen reader friendly markup
- ARIA labels and descriptions
- Semantic HTML structure

## AI-Friendly Code Structure

### Naming Conventions
- Semantic class names: `hero-section`, `feature-card`, `navigation-menu`
- BEM methodology where applicable
- Descriptive IDs and data attributes

### Code Organization
- Modular CSS with utility classes
- Consistent indentation and formatting
- Clear comments for complex sections
- Logical HTML structure with proper nesting

### Component Documentation
- Each component includes usage examples
- Clear prop/attribute documentation
- Accessibility considerations noted
- Browser compatibility information

## Implementation Strategy

### Phase 1: Base Setup
1. Configure Tailwind CSS with custom color palette
2. Set up Flowbite components
3. Create base layout templates

### Phase 2: Component Development
1. Build reusable component library
2. Implement responsive grid systems
3. Create animation utilities

### Phase 3: Page Implementation
1. Convert existing pages to new design system
2. Integrate GSAP animations
3. Test across devices and browsers

### Phase 4: Optimization
1. Performance optimization
2. Accessibility audit
3. Code cleanup and documentation

