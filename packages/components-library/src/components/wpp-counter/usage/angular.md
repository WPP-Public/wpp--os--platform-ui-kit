```ts
@Component({
  ...
})
export class CounterExample {
  public value: number = 5;

  public handleCounterChange(event: Event): void {
    this.value = (event as CustomEvent<CounterChangeEventDetail>).detail.value
  }
}
```

```html
<wpp-counter [value]="value" (wppChange)="handleCounterChange($event)"></wpp-counter>
```
