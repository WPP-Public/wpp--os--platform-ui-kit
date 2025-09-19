import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CheckboxGroupValue } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-checkbox-example',
  templateUrl: './checkbox-example.page.html',
  styleUrls: ['./checkbox-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxExamplePage {
  public labelConfig = {
    //it doesn't display icon, need new approach
    icon: 'wpp-icon-info',
    text: 'Option 3',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public errorType = 'error'
  public warningType = 'warning'
  public message = 'Error message'
  public maxMessageLength = 10
  public checkboxes = [
    {
      value: 'option-1',
      text: 'Option 1',
    },
    {
      value: 'option-2',
      text: 'Option 2',
    },
    {
      value: 'option-3',
      text: 'Option 3',
    },
  ]
  public value: CheckboxGroupValue[] = ['option-1', 'option-2', 'option-3']
  public labelConfigGroup = { text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleWppChange = event => {
    const eventValue = event.detail.value as CheckboxGroupValue[]

    this.value = eventValue
  }

  public handleAddOption = () => {
    if (this.checkboxes.length < 5) {
      this.checkboxes = [
        ...this.checkboxes,
        { value: `option-${this.checkboxes.length + 1}`, text: `Option ${this.checkboxes.length + 1}` },
      ]
    }
  }

  public selectAllOptions = () => {
    this.value = ['option-1', 'option-2', 'option-3', 'option-4', 'option-5']
  }
}
