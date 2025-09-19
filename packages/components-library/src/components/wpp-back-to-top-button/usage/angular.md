```html
<wpp-back-to-top-button *ngIf='showBackToTop' (click)='handleBackToTopClick()'>212</wpp-back-to-top-button>
```

```tsx
import { Component, HostListener } from '@angular/core'

@Component({
  ...
})
export class BackToTopButtonExamplePage {
  public showBackToTop: boolean = false

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 200
  }

  public handleBackToTopClick(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
}
```
