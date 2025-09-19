```ts
import { Component } from '@angular/core'

@Component({
  ...,
})
export class WppMoreButtons {
  public ariaProps = { label: 'More items menu' }

  public handleClick = () => {
    console.log('Clicked')
  }
}
```

```html
<div class="moreBtnSection">
  <wpp-more-button
    (click)="handleClick()"
    ariaProps="ariaProps"
    data-testid="default-more-btn-m"
    class="moreBtnItem"
  ></wpp-more-button>
  <wpp-more-button
    (click)="handleClick()"
    ariaProps="ariaProps"
    data-testid="default-more-btn-s"
    class="moreBtnItem"
    size="s"
  ></wpp-more-button>
</div>
```

```scss
.moreBtnSection {
  margin-bottom: 20px;

  .moreBtnItem {
    margin-right: 100px;

    &:last-child {
      margin-right: 0;
    }
  }
}
```
