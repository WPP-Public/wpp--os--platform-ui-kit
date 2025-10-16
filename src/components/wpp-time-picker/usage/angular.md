```ts
import { Component } from '@angular/core'

@Component({
  selector: 'time-picker-example',
  templateUrl: './time-picker.page.html',
  styleUrls: ['./time-picker.page.scss'],
})
export class TimePickerExamplePage {
  value: string = ''
  minutesInterval: 1 | 5 | 10 | 15 = 15

  handleWppChange(event: any): void {
    console.log(event)
    this.value = event.detail.timeFormat
  }

  handleWppClear(event: any): void {
    console.log(event)
    this.value = event.detail.timeFormat
  }
}
```

```html
<div class="container">
  <wpp-typography class="title" type="xl-heading">Time Picker</wpp-typography>

  <wpp-time-picker
    [value]="value"
    [labelConfig]="{ text: 'Label' }"
    required
    [minutesInterval]="minutesInterval"
    (wppChange)="handleWppChange($event)"
    (wppClear)="handleWppClear($event)"
  >
  </wpp-time-picker>
</div>
```

```scss
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;

  .title {
    margin-bottom: 20px;
  }
}
```
