import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-radio-group-example',
  templateUrl: './radio-buttons-example.page.html',
  styleUrls: ['./radio-buttons-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonsExamplePage {
  public labelConfig = {
    //it doesn't display icon, need new approach
    icon: 'wpp-icon-info',
    text: 'Option 3',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public messageTypeError = 'error'
  public messageTypeWarning = 'warning'
  public maxMessageLength = 10

  public radioGroupValue = 'option-1'
  public labelConfigGroup = { text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public setValue = (value: string) => {
    this.radioGroupValue = value
  }

  public handleChange = (e: Event) => {
    this.radioGroupValue = String((e as CustomEvent).detail.value)
  }
}
