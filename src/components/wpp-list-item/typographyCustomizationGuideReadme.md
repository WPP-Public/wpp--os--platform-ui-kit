# WppListItem Typography Customization Guide

## Overview

The `wpp-list-item` component now supports typography customization for label and caption text. This guide provides best practices and examples for using this feature effectively.

## Typography Props

The list item component supports typography customization through two props:

```typescript
import { ThemeColorValue } from '@wpp/components-library/types/theme-tokens';
import { TypographyType } from '@wpp/components-library/types';

labelTypography?: {
  color?: ThemeColorValue
  type?: TypographyType
}

captionTypography?: {
  color?: ThemeColorValue
  type?: TypographyType
}
```

### Important Notes

- **Subtitle text is not customizable** - It maintains fixed styling for consistency
- **Color prop accepts CSS variables** - Use theme tokens for consistency
- **Typography prop accepts predefined values** - Use `TypographyType` for type safety and consistency

## Best Practices

### 1. Always Use CSS Variables for Colors

❌ **Don't use hex values:**

```html
<wpp-list-item label-typography='{"color": "#FF0000"}'> </wpp-list-item>
```

✅ **Do use CSS variables with ThemeColors:**

```typescript
<wpp-list-item
  labelTypography={{
    color: "var(--wpp-brand-color)",
  }}
></wpp-list-item>
```

### Why CSS Variables?

- Maintains theme consistency across workspaces
- Automatically adapts to light/dark modes
- Ensures brand compliance
- Simplifies maintenance
- Provides type safety

### 2. Typography Type Selection

The `type` property accepts predefined typography styles that control font-family, size, weight, line-height, and other properties:

```typescript
<wpp-list-item
  labelTypography={{
    type: 's-midi',
  }}
></wpp-list-item>
```

Available typography types include:

- `s-body` - Standard body text
- `s-midi` - Medium emphasis
- `s-strong` - Strong emphasis
- `xs-body`, `xs-midi`, `xs-strong` - Extra small variations
- `m-body`, `m-midi`, `m-strong` - Medium variations
- `l-body`, `l-midi`, `l-strong` - Large variations

## Recommended Typography Combinations

### Standard List Item

```typescript
<wpp-list-item>
  <wpp-typography slot="label" type="s-body">Label Text</wpp-typography>
  <wpp-typography slot="caption" type="s-caption">Caption Text</wpp-typography>
</wpp-list-item>
```

### Emphasized List Item

```typescript
<wpp-list-item
  labelTypography={{
    type: 's-midi',
    color: "var(--wpp-grey-color-1000)"
  }}
  captionTypography={{
    type: 's-caption',
    color: "var(--wpp-grey-color-700)"
  }}>
  <wpp-typography slot="label">Important Item</wpp-typography>
  <wpp-typography slot="caption">Additional details</wpp-typography>
</wpp-list-item>
```

### Brand Colored List Item

```typescript
<wpp-list-item
  labelTypography={{
    type: 's-body',
    color: "var(--wpp-brand-color)"
  }}>
  <wpp-typography slot="label">Brand Item</wpp-typography>
</wpp-list-item>
```

### Status Indicators

```typescript
// Success state
<wpp-list-item
  labelTypography={{
    color: "var(--wpp-success-color-400)"
  }}>
  <wpp-typography slot="label">Completed Task</wpp-typography>
</wpp-list-item>

// Warning state
<wpp-list-item
  labelTypography={{
    color: "var(--wpp-warning-color-400)"
  }}>
  <wpp-typography slot="label">Pending Approval</wpp-typography>
</wpp-list-item>

// Error state
<wpp-list-item
  labelTypography={{
    color: "var(--wpp-danger-color-400)"
  }}>
  <wpp-typography slot="label">Failed Operation</wpp-typography>
</wpp-list-item>
```

## Guidelines for Visual Hierarchy

### Do's ✅

1. **Maintain contrast** - Ensure caption text is visually subordinate to label text
2. **Use consistent typography types** - Don't mix incompatible type scales
3. **Follow accessibility standards** - Ensure sufficient color contrast (WCAG AA minimum)
4. **Respect the design system** - Use predefined typography tokens and theme colors
5. **Use ThemeColors** - For better type safety and autocomplete

### Don'ts ❌

1. **Don't make caption text larger than label text** - Use appropriate type scales
2. **Don't use extreme typography variations** that break component layout
3. **Don't use fixed hex colors** - Always use CSS variables
4. **Don't customize subtitle text** - It's intentionally fixed for consistency

## Examples to Avoid

### ❌ Poor Practice: Inverted Hierarchy

```typescript
// Don't make caption more prominent than label
<wpp-list-item labelTypography={{ type: 's-caption' }} captionTypography={{ type: 'l-strong' }}></wpp-list-item>
```

### ❌ Poor Practice: Fixed Colors

```typescript
// Don't use hex colors
<wpp-list-item
  labelTypography={{ color: '#FF5733' }}>
</wpp-list-item>

// Don't use RGB/RGBA values
<wpp-list-item
  labelTypography={{ color: 'rgb(255, 87, 51)' }}>
</wpp-list-item>
```

## Support

If you need to achieve a specific design that seems to require breaking these guidelines:

1. First, check if it can be achieved within the guidelines
2. Consult the design system documentation
3. Review available typography types and color tokens
4. Reach out to the design system team for guidance

Remember: These guidelines exist to ensure consistency, accessibility, and maintainability across all applications using the component library.
