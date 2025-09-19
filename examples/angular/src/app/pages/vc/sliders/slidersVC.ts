import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-slider-example',
  templateUrl: './slidersVC.html',
  styleUrls: ['./slidersVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidersVC {
  public inputWidth: `${number}px` | undefined = undefined
  public initiallySingleValue = 1
  public initiallyRangeValue = [3, 5]
  public maskOptionsSingleOption1 = {
    precision: 2,
    decimalSeparator: '.',
    prefix: '$',
  }
  public maskOptionsSingleOption2 = {
    decimalSeparator: '.',
    thousandSeparator: ',',
    prefix: '$',
  }
  public maskOptionsRangeOption1 = [
    {
      precision: 2,
      decimalSeparator: '.',
      prefix: '$',
    },
    {
      precision: 2,
      decimalSeparator: '.',
      postfix: '%',
    },
  ]
  public maskOptionsRangeOption2 = [
    {
      decimalSeparator: '.',
      thousandSeparator: ',',
      prefix: '$',
    },
    {
      decimalSeparator: '.',
      thousandSeparator: ',',
      postfix: '%',
    },
  ]
  public maskOptionsRangeOption3 = [
    {
      precision: 2,
      thousandSeparator: ',',
      decimalSeparator: '.',
      prefix: '$',
    },
    {
      precision: 2,
      thousandSeparator: ',',
      decimalSeparator: '.',
      postfix: '%',
    },
  ]
  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Range slider with stepped selection',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }
  public marks = [
    {
      label: 'low',
      value: 1,
    },
    {
      label: 'medium',
      value: 2,
    },
    {
      label: 'rare',
      value: 3,
    },
  ]

  public singleValue = this.initiallySingleValue
  public rangeValue = this.initiallyRangeValue

  public handleSingleSliderChange = (event: Event) => {
    console.log('single slider data =>', (event as CustomEvent).detail)

    this.singleValue = (event as CustomEvent).detail.value
  }

  public handleRangeSliderChange = (event: Event) => {
    console.log('range slider data =>', (event as CustomEvent).detail)

    this.rangeValue = (event as CustomEvent).detail.value
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public setInputWidth = (value: `${number}px` | undefined): void => {
    this.inputWidth = value
  }
}
