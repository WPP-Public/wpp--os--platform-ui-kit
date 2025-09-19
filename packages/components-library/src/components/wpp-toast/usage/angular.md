```ts
@Component({
  ...
})
export class ToastExample {
  @ViewChild('toastContainer')
  private readonly toastContainer!: WppToastContainer;

  public addToast(): void {
    this.toastContainer.addToast({
      message: 'Message',
      type: 'success'
    });
  }
}
```

```html
<wpp-button (click)="addToast()">Add Toast</wpp-button>
<wpp-toast-container #toastContainer [maxToastsToDisplay]="5"></wpp-toast-container>
```
