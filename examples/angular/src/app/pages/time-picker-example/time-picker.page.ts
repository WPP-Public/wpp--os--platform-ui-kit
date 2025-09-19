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

  setValue(value: string): void {
    this.value = value
  }

  setMinutesInterval(interval: 1 | 5 | 10 | 15): void {
    this.minutesInterval = interval
  }
}
