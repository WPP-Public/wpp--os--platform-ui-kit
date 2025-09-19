```html

<!-- Without value: shows indeterminate -->
<wpp-progress-indicator variant="circle"></wpp-progress-indicator>

<!-- value=0 but forceIntermediateEmptyState=true: shows 0% empty state -->
<wpp-progress-indicator
  variant="circle"
  [value]="0"
  [forceIntermediateEmptyState]="true"
  is-show-percentage
  label="0%"
></wpp-progress-indicator>

<!-- With value>0: shows defined progress -->
<wpp-progress-indicator variant="circle" [value]="50"></wpp-progress-indicator>

```
