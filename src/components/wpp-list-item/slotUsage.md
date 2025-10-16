
# WppListItem Slot Usage Guidelines

## Overview

The List Item component provides flexible slots for customization while maintaining consistency with Figma design guidelines. This document outlines recommended patterns and best practices.

## Table of Contents
- [Quick Reference](#quick-reference)
- [Detailed Slot Guidelines](#detailed-slot-guidelines)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)

## Quick Reference

| Slot       | Purpose                | Recommended Components                                                      |
| ---------- | ---------------------- | --------------------------------------------------------------------------- |
| `left`     | Leading visual element | • Single: `wpp-icon-*`, `wpp-avatar`<br>• Multiple: Auto-generated checkbox |
| `right`    | Trailing action/info   | • Single: Icons, buttons, tags, toggles<br>• Multiple: Tags, text, menu     |
| `label`    | Primary text           | Plain text or `span` elements                                               |
| `caption`  | Secondary text         | Plain text or `span` elements                                               |
| `subtitle` | Section header         | Plain text or `span` elements                                               |

## Detailed Slot Guidelines

### Left Slot

The left slot is designed for visual indicators that help identify or categorize list items.

#### ✅ Recommended Usage

**Single Selection Mode:**

```html
<!-- Icon -->
<wpp-list-item>
  <wpp-icon-document slot="left"></wpp-icon-document>
  <span slot="label">Document.pdf</span>
</wpp-list-item>

<!-- Avatar -->
<wpp-list-item>
  <wpp-avatar size="xs" slot="left" name="John Doe"></wpp-avatar>
  <span slot="label">John Doe</span>
</wpp-list-item>

<!-- Logo/Square Avatar -->
<wpp-list-item>
  <wpp-avatar variant="square" size="xs" slot="left" src="logo.png"></wpp-avatar>
  <span slot="label">Company Name</span>
</wpp-list-item>
```

**Multiple Selection Mode:**

```html
<!-- Checkbox is automatically added - no left slot needed -->
<wpp-list-item multiple>
  <span slot="label">Selectable item</span>
</wpp-list-item>
```

#### ⚠️ Use With Caution

```html
<!-- Custom content - ensure it maintains visual consistency -->
<wpp-list-item>
  <div slot="left" class="custom-indicator">A</div>
  <span slot="label">Custom indicator</span>
</wpp-list-item>
```

### Right Slot

The right slot accommodates actions, status indicators, and supplementary information.

#### ✅ Recommended Usage

**Single Selection Mode:**

```html
<!-- Navigation indicator -->
<wpp-list-item>
  <span slot="label">Settings</span>
  <wpp-icon-chevron slot="right"></wpp-icon-chevron>
</wpp-list-item>

<!-- Action button -->
<wpp-list-item>
  <span slot="label">Add user</span>
  <wpp-action-button variant="secondary" slot="right" aria-label="Add user">
    <wpp-icon-plus slot="icon-start"></wpp-icon-plus>
  </wpp-action-button>
</wpp-list-item>

<!-- Toggle switch -->
<wpp-list-item>
  <span slot="label">Notifications</span>
  <wpp-toggle slot="right" checked aria-label="Toggle notifications"></wpp-toggle>
</wpp-list-item>

<!-- Status tag -->
<wpp-list-item>
  <span slot="label">Project Alpha</span>
  <wpp-tag variant="positive" label="Active" slot="right"></wpp-tag>
</wpp-list-item>

<!-- Text information -->
<wpp-list-item>
  <span slot="label">Storage used</span>
  <wpp-typography type="s-body" slot="right">2.5 GB</wpp-typography>
</wpp-list-item>

<!-- Context menu -->
<wpp-list-item>
  <span slot="label">File options</span>
  <wpp-menu-context slot="right">
    <wpp-icon-more slot="trigger"></wpp-icon-more>
    <!-- menu items -->
  </wpp-menu-context>
</wpp-list-item>
```

**Multiple Selection Mode:**

```html
<!-- Status indicator -->
<wpp-list-item multiple checked>
  <span slot="label">Selected item</span>
  <wpp-tag variant="neutral" label="3 files" slot="right"></wpp-tag>
</wpp-list-item>

<!-- Text metadata -->
<wpp-list-item multiple>
  <span slot="label">Team member</span>
  <wpp-typography type="s-body" slot="right">Admin</wpp-typography>
</wpp-list-item>

<!-- Action button (less common but allowed) -->
<wpp-list-item multiple>
  <span slot="label">Bulk action item</span>
  <wpp-action-button variant="tertiary" slot="right" aria-label="More options">
    <wpp-icon-more slot="icon"></wpp-icon-more>
  </wpp-action-button>
</wpp-list-item>
```

#### ⚠️ Use With Caution

```html
<!-- Multiple interactive elements - can be confusing -->
<wpp-list-item>
  <span slot="label">Complex item</span>
  <div slot="right" style="display: flex; gap: 8px;">
    <button>Edit</button>
    <button>Delete</button>
  </div>
</wpp-list-item>

<!-- Custom complex content -->
<wpp-list-item>
  <span slot="label">Custom content</span>
  <div slot="right" class="custom-widget">
    <!-- Complex custom implementation -->
  </div>
</wpp-list-item>
```

### Label & Caption Slots

These slots handle the main textual content of the list item.

```html
<!-- Single line -->
<wpp-list-item>
  <span slot="label">Primary text only</span>
</wpp-list-item>

<!-- Two lines -->
<wpp-list-item>
  <span slot="label">Primary text</span>
  <span slot="caption">Supporting text with additional details</span>
</wpp-list-item>

<!-- With custom typography -->
<wpp-list-item
  :label-typography='{"type": "s-midi", "color": "var(--wpp-brand-color)"}'
  :caption-typography='{"type": "s-caption", "color": "var(--wpp-warning-color-500)"}'>
  <span slot="label">Styled label</span>
  <span slot="caption">Styled caption</span>
</wpp-list-item>

<!-- With highlighting -->
<wpp-list-item highlight="search term">
  <span slot="label">This contains the search term</span>
  <span slot="caption">Caption with search term highlighted</span>
</wpp-list-item>
```

### Subtitle Slot

Used for grouping list items under section headers.

```html
<!-- Basic section header -->
<wpp-list-item>
  <span slot="subtitle">Section Title</span>
  <span slot="label">First item in section</span>
</wpp-list-item>

<!-- Section header with count -->
<wpp-list-item>
  <span slot="subtitle">Recent Files (12)</span>
  <span slot="label">document.pdf</span>
</wpp-list-item>
```

## Common Patterns

### File/Document List

```html
<wpp-list-item>
  <wpp-icon-document slot="left"></wpp-icon-document>
  <span slot="label">Annual Report 2024.pdf</span>
  <span slot="caption">2.4 MB • Modified 2 hours ago</span>
  <wpp-menu-context slot="right">
    <wpp-icon-more slot="trigger"></wpp-icon-more>
    <wpp-menu-item slot="menu-item">Download</wpp-menu-item>
    <wpp-menu-item slot="menu-item">Share</wpp-menu-item>
    <wpp-menu-item slot="menu-item">Delete</wpp-menu-item>
  </wpp-menu-context>
</wpp-list-item>
```

### User List

```html
<wpp-list-item>
  <wpp-avatar size="xs" slot="left" name="Jane Smith"></wpp-avatar>
  <span slot="label">Jane Smith</span>
  <span slot="caption">jane.smith@company.com</span>
  <wpp-tag variant="info" label="Owner" slot="right"></wpp-tag>
</wpp-list-item>
```

### Settings List

```html
<wpp-list-item>
  <wpp-icon-notification slot="left"></wpp-icon-notification>
  <span slot="label">Push Notifications</span>
  <span slot="caption">Receive alerts on your device</span>
  <wpp-toggle slot="right" checked aria-label="Toggle push notifications"></wpp-toggle>
</wpp-list-item>
```

### Navigation Menu

```html
<wpp-list-item is-extended>
  <wpp-icon-settings slot="left"></wpp-icon-settings>
  <span slot="label">Settings</span>
</wpp-list-item>
```

### Selectable List (Multiple)

```html
<wpp-list-item multiple selectable>
  <span slot="label">Option 1</span>
  <wpp-typography type="s-body" slot="right">Value 1</wpp-typography>
</wpp-list-item>
```

## Best Practices

### Do's ✅

- **Maintain visual hierarchy**: Use consistent icon sizes and styles
- **Keep it simple**: Limit right slot to one primary action or indicator
- **Follow patterns**: Use established patterns for common use cases
- **Test accessibility**: Ensure custom content is keyboard navigable
- **Consider touch targets**: Maintain adequate spacing for mobile (minimum 44x44px)
- **Use semantic HTML**: Use appropriate elements for better accessibility
- **Provide labels**: Add aria-labels to interactive elements without visible text

### Don'ts ❌

- **Avoid overcrowding**: Don't put too many elements in slots
- **Don't mix metaphors**: Keep visual indicators consistent
- **Avoid deep nesting**: Don't nest interactive elements
- **Don't break expectations**: Follow platform conventions
- **Don't use conflicting actions**: Avoid multiple actions that compete for attention
- **Don't rely on color alone**: Use icons or text in addition to color coding

## Questions or Feedback?

If you have questions about slot usage or need guidance for a specific use case, please:

- Reach out in the #design-system-support Slack channel
- Review Figma designs for visual reference
