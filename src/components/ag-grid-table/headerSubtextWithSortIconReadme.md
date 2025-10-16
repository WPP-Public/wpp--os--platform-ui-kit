# AG-Grid Table Header with Sub-text and Sort Icon

This component provides enhanced table header functionality with support for multi-line headers, info icons, and flexible text alignment across React, Vue, and Angular frameworks.

## Features

- **Multi-line headers**: Display primary header text with optional sub-text
- **Info icon with tooltip**: Show contextual information about columns
- **Sort functionality**: Built-in sorting with visual indicators
- **Text alignment**: Configure left or right alignment for header content
- **Framework parity**: Consistent implementation across React, Vue, and Angular

## Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| displayName | string | - | The primary header text (required) |
| enableSorting | boolean | false | Enable/disable sorting for the column |
| showInfoIcon | boolean | false | Show info icon with tooltip |
| subText | string | - | Secondary text displayed below the header |
| alignment | 'left' \\| 'right' | 'left' | Text alignment for header content |

## Implementation Examples

### React

```tsx
// HeaderCell component usage
import HeaderCell from './components/HeaderCell'

const columnDefs = [
  {
    field: 'firstName',
    headerName: 'First Name',
    sortable: true,
    headerComponent: HeaderCell,
    headerComponentParams: {
      showInfoIcon: true,
      subText: 'Given name',
      alignment: 'left'
    }
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    sortable: true,
    headerComponent: HeaderCell,
    headerComponentParams: {
      showInfoIcon: true,
      subText: 'Family name',
      alignment: 'right'
    }
  }
]

// In your AgGridReact component
<AgGridReact
  columnDefs={columnDefs}
  defaultColDef={{
    headerComponent: HeaderCell
  }}
  // ... other props
/>
```

### Vue

```vue
<!-- In your Vue component -->
<template>
  <ag-grid-vue
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    class="ag-theme-wpp"
    // ... other props
  />
</template>

<script>
import HeaderCellRenderer from './components/HeaderCellRenderer.vue'

export default {
  data() {
    return {
      defaultColDef: {
        headerComponent: HeaderCellRenderer
      },
      columnDefs: [
        {
          field: 'firstName',
          headerName: 'First Name',
          sortable: true,
          headerComponentParams: {
            showInfoIcon: true,
            subText: 'Given name',
            alignment: 'left'
          }
        },
        {
          field: 'lastName',
          headerName: 'Last Name',
          sortable: true,
          headerComponentParams: {
            showInfoIcon: true,
            subText: 'Family name',
            alignment: 'right'
          }
        }
      ]
    }
  }
}
</script>
```

### Angular

```typescript
// In your Angular component
import { HeaderCellRenderer } from './components/header-cell-renderer/header-cell-renderer'

@Component({
  selector: 'app-ag-grid-example',
  template: `
    <ag-grid-angular
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      class="ag-theme-wpp"
      // ... other props
    ></ag-grid-angular>
  `
})
export class AgGridExampleComponent {
  defaultColDef = {
    headerComponent: HeaderCellRenderer
  };

  columnDefs = [
    {
      field: 'firstName',
      headerName: 'First Name',
      sortable: true,
      headerComponentParams: {
        showInfoIcon: true,
        subText: 'Given name',
        alignment: 'left'
      }
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      sortable: true,
      headerComponentParams: {
        showInfoIcon: true,
        subText: 'Family name',
        alignment: 'right'
      }
    }
  ];
}

// Don't forget to declare HeaderCellRenderer in your module
@NgModule({
  declarations: [HeaderCellRenderer],
  // ... other module configuration
})
```

## Styling

The component uses the following CSS classes:

```css
.ag-header-cell-comp {
  /* Main header container */
  display: flex;
  align-items: center;
  width: 100%;
}

.ag-header-cell-left {
  /* Left-aligned header content */
}

.ag-header-cell-right {
  /* Right-aligned header content */
}

.ag-header-content {
  /* Header content wrapper */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ag-header-main-line {
  /* Primary header text and info icon container */
  display: flex;
  align-items: center;
  gap: 4px;
}

.ag-header-sub-text {
  /* Sub-text container */
  color: var(--wpp-grey-color-600);
  line-height: 1.2;
}

.ag-sorting {
  /* Sort icon container */
  display: flex;
  flex-direction: column;
  margin-left: 4px;
}
```

## Usage Guidelines

1. **Sub-text**: Use sub-text to provide additional context or clarification for column headers. Keep it concise.

2. **Info Icons**: Use info icons when you need to provide more detailed explanations that don't fit in the sub-text.

3. **Alignment**:
   - Use left alignment (default) for text-based columns
   - Consider right alignment for numeric columns or when it improves readability

4. **Sorting**: Enable sorting only on columns where it makes logical sense for the data type.

## Migration from Previous Version

If you're upgrading from the basic header implementation:

1. Update your header component imports
2. Add the new component props to your column definitions
3. The component is backward compatible - existing headers without the new props will continue to work

## Examples with Different Configurations

### Simple sortable column
```javascript
{
  field: 'name',
  sortable: true
}
```

### Column with sub-text only
```javascript
{
  field: 'email',
  headerComponentParams: {
    subText: 'Primary contact'
  }
}
```

### Full featured header
```javascript
{
  field: 'salary',
  sortable: true,
  headerComponentParams: {
    showInfoIcon: true,
    subText: 'Annual gross',
    alignment: 'right'
  }
}
```

## Related Components

- `WppTypography` - For text styling
- `WppIconInfo` - Info icon component
- `WppTooltip` - Tooltip wrapper
- `WppIconTableSortWrapper` - Sort icon component