```html
<div>
  <wpp-typography type="xl-heading">Checkbox Group</wpp-typography>
  <wpp-checkbox-group
    [labelConfig]="labelConfigGroup"
    class="checkboxGroup"
    [value]="value"
    (wppChange)="handleWppChange($event)"
  >
    <wpp-checkbox
      *ngFor="let checkbox of checkboxes"
      [key]="checkbox.value"
      required
      [value]="checkbox.value"
      message="Warning message"
      [messageType]="warningType"
      [maxMessageLength]="maxMessageLength"
      [labelConfig]="{ text: checkbox.text }"
    >
    </wpp-checkbox>
  </wpp-checkbox-group>

  <wpp-button [style]="{ marginTop: '10px' }" [disabled]="checkboxes.length === 5" (click)="handleAddOption()">
    Add option
  </wpp-button>

  <wpp-button [style]="{ marginTop: '10px' }" (click)="selectAllOptions()"> Select All options </wpp-button>
</div>
```

**component.ts**

```tsx
import { CheckboxGroupValue } from '@platform-ui-kit/components-library'

@Component({…})

export class CheckboxExamplePage {
  public warningType = 'warning'
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
```
