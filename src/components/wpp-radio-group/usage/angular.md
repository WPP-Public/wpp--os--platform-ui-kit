```html
<div>
  <wpp-typography type="xl-heading">With truncation on warning message</wpp-typography>
  <wpp-radio-group
    class="radioGroup"
    [value]="radioGroupValue"
    [labelConfig]="labelConfigGroup"
    message="Warning message"
    [messageType]="messageTypeWarning"
    [maxMessageLength]="maxMessageLength"
    (wppChange)="handleChange($event)"
  >
    <wpp-radio required value="option-1" [labelConfig]="getLabelConfig('Option-1')"></wpp-radio>
    <wpp-radio required value="option-2" [labelConfig]="getLabelConfig('Option-2')"></wpp-radio>
    <wpp-radio required value="option-3" [labelConfig]="getLabelConfig('Option-3')"></wpp-radio>
    <wpp-radio required value="option-4" [labelConfig]="getLabelConfig('Option-4')"></wpp-radio>
    <wpp-radio required value="option-5" [labelConfig]="getLabelConfig('Option-5')"></wpp-radio>
  </wpp-radio-group>

  <h4>Programmatically set value of radio group:</h4>
  <div class="buttons">
    <wpp-button size="s" variant="secondary" (click)="setValue('option-1')"> Set option-1 </wpp-button>
    <wpp-button size="s" variant="secondary" (click)="setValue('option-2')"> Set option-2 </wpp-button>
    <wpp-button size="s" variant="secondary" (click)="setValue('option-3')"> Set option-3 </wpp-button>
    <wpp-button size="s" variant="secondary" (click)="setValue('')"> Reset </wpp-button>
  </div>
</div>
```

**component.ts**

```tsx
@Component({…})

export class RadioGroupExample {
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
```
