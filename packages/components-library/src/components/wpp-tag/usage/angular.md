```html
<wpp-tag [label]="text" [variant]="variant"></wpp-tag>
```

**component.ts**

```tsx
import { Component } from '@angular/core';

@Component({…})

export class TagExample {
  text = 'Title'
  variant = 'positive'
}
```
