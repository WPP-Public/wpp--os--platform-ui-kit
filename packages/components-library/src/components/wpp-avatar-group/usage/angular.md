```html
<wpp-avatar-group
  [avatars]='avatars'
  [maxAvatarsToDisplay]='maxAvatarsToDisplay'
  size='s'
  withTooltip='bottom'
></wpp-avatar-group>
```

**component.ts**

```tsx
import { Component } from '@angular/core';

@Component({…})

export class AvatarGroupExample {
  avatars = [
    {
      name: 'Rose Langworth MD',
      src: '',
    },
    {
      name: 'Ryan Kozey',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmijLXXeVuoV8O4bTS2DTFK1e8zsIeo_7H8w&usqp=CAU',
    },
    {
      name: 'Shawna Paucek',
      src: '',
    },
    {
      name: 'Rikard Linn',
      color: 'var(--wpp-dataviz-color-cat-neutral-10)',
    },
  ]
  maxAvatarsToDisplay = 2
}
```
