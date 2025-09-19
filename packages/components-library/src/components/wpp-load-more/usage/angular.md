```html
<wpp-load-more
  [totalItems]="100"
  [itemsLoaded]="itemsLoaded1"
  [showProgressBar]="true"
  [loading]="loading1"
  [incrementBy]="10"
  (wppClickLoadMore)="handleLoadMore1($event)"
></wpp-load-more>

<wpp-load-more
  [totalItems]="100"
  [itemsLoaded]="50"
  [showProgressBar]="true"
  [loading]="false"
  [incrementBy]="10"
></wpp-load-more>
```

**component.ts**

```tsx
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemsLoaded1 = 30;
  loading1 = false;

  handleLoadMore1(event: CustomEvent<{ newItemsLoaded: number; incrementBy: number }>) {
    const { newItemsLoaded, incrementBy } = event.detail;
    this.loading1 = true;
    setTimeout(() => {
      this.itemsLoaded1 = newItemsLoaded;
      this.loading1 = false;
    }, 1000);
  }
}
```