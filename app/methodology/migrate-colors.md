# Design System Migration Guide

## Overview
This guide helps migrate from inline styles to the centralized design system for easy color palette experimentation.

## Design System Structure

### Color Palette Interface
```typescript
interface ColorPalette {
  background: string;
  text: {
    primary: string;    // Main headings, emphasis
    secondary: string;  // Body text, readable content  
    accent: string;     // Highlights, subsections
    muted: string;      // Subtle elements, borders
    code: string;       // Code block text
  };
  surface: {
    card: string;       // Card backgrounds
    border: string;     // Border colors
    hover: string;      // Hover states
  };
  semantic: {
    info: string;       // Information highlights
    warning: string;    // Warning elements
    success: string;    // Success states
  };
}
```

## Migration Patterns

### 1. Replace Inline Colors with Design System Styles

**Before:**
```tsx
<h1 style={{color: '#F2F2F2'}}>Title</h1>
<p style={{color: '#9FA1A6'}}>Body text</p>
<span style={{color: '#C7CFD9'}}>Accent text</span>
```

**After:**
```tsx
<h1 style={styles.heading}>Title</h1>
<p style={styles.body}>Body text</p>
<span style={styles.subheading}>Accent text</span>
```

### 2. Replace Background Colors

**Before:**
```tsx
<div style={{backgroundColor: 'rgba(82, 82, 89, 0.2)', borderColor: '#525259'}}>
```

**After:**
```tsx
<div style={styles.card}>
```

### 3. Replace Complex Inline Styles

**Before:**
```tsx
<div style={{
  backgroundColor: 'rgba(199, 206, 216, 0.2)', 
  border: '2px solid #525259',
  color: '#C7CFD9'
}}>
```

**After:**
```tsx
<div style={styles.badge}>
```

## Common Style Mappings

| Old Inline Style | New Design System Style |
|------------------|-------------------------|
| `color: '#F2F2F2'` | `styles.heading` |
| `color: '#9FA1A6'` | `styles.body` |
| `color: '#C7CFD9'` | `styles.subheading` |
| `color: '#525259'` | `styles.muted` |
| `backgroundColor: 'rgba(82, 82, 89, 0.2)'` | `styles.card` |
| `borderColor: '#525259'` | `styles.card` |
| Badge styles | `styles.badge` |
| Code block styles | `styles.codeBlock` |
| Highlight box styles | `styles.highlight` |

## Experimenting with New Palettes

### Step 1: Change the Active Palette
In `design-system.ts`, change this line:
```typescript
export const currentPalette = edifisPalette;
```

To any of the available palettes:
```typescript
export const currentPalette = oceanicPalette;    // Blue ocean theme
export const currentPalette = forestPalette;     // Green forest theme  
export const currentPalette = monochromePalette; // Pure grayscale
```

### Step 2: Create Custom Palettes
Add your own palette to the design system:
```typescript
export const myCustomPalette: ColorPalette = {
  background: '#your-bg-color',
  text: {
    primary: '#your-primary-text',
    secondary: '#your-secondary-text',
    accent: '#your-accent-color',
    muted: '#your-muted-color',
    code: '#your-code-color',
  },
  // ... rest of the palette
};
```

### Step 3: Test Different Themes
Simply change the `currentPalette` export and refresh the page to see the new theme applied across the entire methodology page.

## Benefits

1. **Easy Experimentation**: Change one line to try different color schemes
2. **Consistency**: All colors come from a single source of truth
3. **Maintainability**: Update colors in one place instead of hundreds of inline styles
4. **Scalability**: Easy to add new color variations and themes
5. **Type Safety**: TypeScript ensures all required colors are defined

## Next Steps

1. Complete the migration by replacing all remaining inline styles
2. Test different palettes to find the perfect theme
3. Consider adding theme switching functionality for users
4. Extend the design system with spacing, typography, and component styles
