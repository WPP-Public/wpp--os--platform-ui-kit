### inline-edit-example.page.html

```angular2html
<div class="wrapper">
  <div>
    <h3>Inline Edit Input</h3>
    <wpp-inline-edit
      [value]="inputValue"
      [mode]="inputMode"
      [inputWidth]="'300px'"
      (wppModeChange)="handleInputModeChange($event)"
      (wppConfirm)="handleConfirm($event)"
    >
      <wpp-input
        size="s"
        slot="form-element"
         name="InlineEdit with Input Example"
        [value]="inputValue"
        (wppChange)="handleInputValueChange($event)"
      ></wpp-input>
    </wpp-inline-edit>
  </div>

  <div>
    <h3>Inline Edit Textarea</h3>
    <wpp-inline-edit
      [value]="textareaText"
      [mode]="textareaMode"
      [inputWidth]="'300px'"
      (wppModeChange)="handleTextareaModeChange($event)"
      (wppConfirm)="handleConfirm($event)"
    >
      <wpp-textarea-input
        size="s"
        slot="form-element"
        name="InlineEdit with Textarea Example"
        [value]="textareaText"
        (wppChange)="handleTextareaValueChange($event)"
      ></wpp-textarea-input>
    </wpp-inline-edit>
  </div>
</div>

```

### inline-edit-example.page.ts

```typescript
const simulateServerRequest = (value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value.length < 5) {
        reject(new Error(`The value needs to be at least 5 characters long! Current length: ${value.length}`))
      } else {
        resolve()
      }
    }, 1000)
  })
}

@Component({
  selector: 'app-inline-edit-example',
  templateUrl: './inline-edit-example.page.html',
  styleUrls: ['./inline-edit-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEditExamplePage {
  public inputValue = 'input value'
  public inputMode = 'read'
  public textareaValue = 'textarea value'
  public textareaMode = 'read'
  public textareaInlineEditConfig = { placement: 'bottom-start' }

  public handleInputModeChange(event: Event) {
    const e = event as CustomEvent<InlineEditChangeModeEventDetail>

    this.inputMode = e.detail.mode
  }

  public handleInputValueChange(event: Event) {
    this.inputValue = ((event as CustomEvent<InputChangeEventDetail>).target as HTMLWppInputElement).value
  }

  public handleTextareaModeChange(event: Event) {
    const e = event as CustomEvent<InlineEditChangeModeEventDetail>

    this.textareaMode = e.detail.mode
  }

  public handleTextareaValueChange(event: Event) {
    this.textareaValue = ((event as CustomEvent<InputChangeEventDetail>).target as HTMLWppInputElement).value
  }

  public handleConfirm = (event: Event) => {
    const { value, waitUntil } = (event as CustomEvent).detail

    waitUntil(simulateServerRequest(value))
  }
}
```
