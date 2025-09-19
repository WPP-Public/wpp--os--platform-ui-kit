### inline-edit-example.page.html
```angular2html
<div class="wrapper">
  <div>
    <h3>Inline Edit Input</h3>
    <wpp-inline-edit [value]="inputValue" [mode]="inputMode" (wppModeChange)="handleInputModeChange($event)" [inputWidth]="'300px'">
      <wpp-input
        size="s"
        slot="form-element"
        [value]="inputValue"
        (wppChange)="handleInputValueChange($event)"
      ></wpp-input>
    </wpp-inline-edit>
  </div>

  <div>
    <h3>Inline Edit Textarea</h3>
    <wpp-inline-edit
      [value]="textareaValue"
      [mode]="textareaMode"
      (wppModeChange)="handleTextareaModeChange($event)"
      [dropdownConfig]="textareaInlineEditConfig" [inputWidth]="'300px'"
    >
      <wpp-textarea-input
        slot="form-element"
        [value]="textareaValue"
        (wppChange)="handleTextareaValueChange($event)"
      ></wpp-textarea-input>
    </wpp-inline-edit>
  </div>
</div>

```

### inline-edit-example.page.ts
```typescript
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
    if (e.detail.mode === 'read') {
      e.detail.closePopover()
    }
  }

  public handleInputValueChange(event: Event) {
    this.inputValue = ((event as CustomEvent<InputChangeEventDetail>).target as HTMLWppInputElement).value
  }

  public handleTextareaModeChange(event: Event) {
    const e = event as CustomEvent<InlineEditChangeModeEventDetail>

    this.textareaMode = e.detail.mode
    if (e.detail.mode === 'read') {
      e.detail.closePopover()
    }
  }

  public handleTextareaValueChange(event: Event) {
    this.textareaValue = ((event as CustomEvent<InputChangeEventDetail>).target as HTMLWppInputElement).value
  }
}

```
