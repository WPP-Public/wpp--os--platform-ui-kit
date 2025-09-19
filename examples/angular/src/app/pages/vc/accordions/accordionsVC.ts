import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-accordions-example',
  templateUrl: './accordionsVC.html',
  styleUrls: ['./accordionsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionsVC {
  public dropdownConfig = { popperOptions: { strategy: 'fixed' } }
  public showTags = false
  public value1 = ''
  public value2 = ''
  public LIST_1 = [
    {
      value: 'test',
      label: 'test',
    },
    {
      value: 'test2',
      label: 'test2',
    },
    {
      value: 'test3',
      label: 'test3',
    },
  ]
  public LIST_2 = [
    {
      value: 1,
      label: 'Item 1',
      slots: [{ type: 'wpp-icon-plus', props: { slot: 'left' } }],
    },
  ]

  public getLabelConfig = (text: string) => ({
    text,
  })

  public toggleTags(): void {
    this.showTags = !this.showTags
  }

  public handleChange1 = (event: Event) => {
    const customEvent = event as CustomEvent

    this.value1 = customEvent.detail.value
  }

  public handleChange2 = (event: Event) => {
    const customEvent = event as CustomEvent

    this.value2 = customEvent.detail.value
  }
}
