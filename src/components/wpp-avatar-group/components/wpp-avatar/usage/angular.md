```html
<wpp-avatar
  [name]='name'
  [tooltipPlacement]='tooltipPlacement'
  [withTooltip]='withTooltip'
  [src]='src'
></wpp-avatar>
```

**component.ts**

```tsx
import { Component } from '@angular/core';

@Component({…})

export class AvatarExample {
  name = 'Voise Nueke'
  tooltipPlacement = 'bottom'
  withTooltip = true
  src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmijLXXeVuoV8O4bTS2DTFK1e8zsIeo_7H8w&usqp=CAU'
}
```
