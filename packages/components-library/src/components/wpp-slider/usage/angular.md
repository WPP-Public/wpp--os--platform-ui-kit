```ts
@Component({
  ...
})
export class SliderExample {
  public value: number = 5

  public handleSliderChange(event: Event): void {
    this.value = (event as CustomEvent<SliderChangeEventDetail>).detail.value
  }
}
```

```html
<wpp-slider size="s" [value]="value" (wppChange)="handleSliderChange($event)"></wpp-slider>
```
