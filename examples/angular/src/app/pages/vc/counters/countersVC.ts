import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-counters',
  templateUrl: './countersVC.html',
  styleUrls: ['./countersVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountersVC {
  public initiallyValue = 1
  public value = this.initiallyValue
  public formattedNumber = String(this.initiallyValue)
  public format = {
    searchValue: /(.)(?=(\d{3})+$)/g,
    replaceValue: '$1 ',
  }
  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Counter',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public handleCounterChange = (event: Event) => {
    const number = (event as CustomEvent).detail.value
    const formattedCounterNumber = String(number).replace(/(.)(?=(\d{3})+$)/g, '$1 ')

    this.value = number
    this.formattedNumber = formattedCounterNumber
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
