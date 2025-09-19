import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-select-text-example',
  templateUrl: './selects-textVC.html',
  styleUrls: ['./selects-textVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectsTextVC {
  public selectValue1 = ''
  public selectValue2 = 'cars'
  public selectValue3 = ''
  public LIST_1 = [
    {
      value: 'car',
      label: 'Car',
    },
    {
      value: 'house',
      label: 'House',
      disabled: true,
    },
    {
      value: 'apartment',
      label: 'Apartment',
    },
  ]
  public LIST_2 = [
    {
      value: 'house',
      label: 'House with plus',
      slots: [
        {
          type: 'wpp-icon-plus',
          props: {
            slot: 'left',
          },
        },
      ],
    },
    {
      value: 'food',
      label: 'Food again',
    },
    {
      value: 'disabled-item',
      label: 'Disabled item',
      disabled: true,
    },
    {
      value: 'cars',
      label: 'Cars more',
      slots: [
        {
          type: 'wpp-icon-success',
          props: {
            slot: 'right',
          },
        },
      ],
    },
    {
      value: 'text-plus',
      label: 'TextPlus',
      slots: [
        {
          type: 'wpp-icon-plus',
          props: {
            slot: 'left',
          },
        },
      ],
    },
    {
      value: 'just-text',
      label: 'text',
    },
  ]
  public LIST_3 = [
    {
      value: 'house',
      label: 'House with plus',
      slots: [
        {
          type: 'wpp-icon-plus',
          props: {
            slot: 'left',
          },
        },
      ],
    },
  ]

  public message =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices enim nunc, nec molestie nibh commodo at home'

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleChange1 = (event: Event) => {
    const detail = (event as CustomEvent).detail

    console.log('value :>> ', detail)
    this.selectValue1 = detail.value
  }

  public handleChange2 = (event: Event) => {
    const detail = (event as CustomEvent).detail

    console.log('value :>> ', detail)
    this.selectValue2 = detail.value
  }

  public handleChange3 = (event: Event) => {
    const detail = (event as CustomEvent).detail

    console.log('value :>> ', detail)
    this.selectValue3 = detail.value
  }
}
