```html
<wpp-input
  [labelConfig]='labelConfig'
  [message]='validationMessage()'
  [messageType]='messageType'
  name='name'
  id='name'
>
  <wpp-icon-search slot="icon-start" aria-label="Search icon" />
  <wpp-icon-cross slot="icon-end" aria-label="Clear icon" onClick={this.handleInputClear} />
</wpp-input>
```

**component.ts**

```tsx
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'


@Component({…})

export class TextInputExample {
  public messageType: string = ''
  public labelConfig = {
    text: 'Label',
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    isReady: new FormControl(true),
  })

  get formControls(): any {
    return this.form.controls
  }

  validationMessage() {
    if (this.formControls.name.touched && this.formControls.name.invalid) {
      this.messageType = 'error'
      return 'Name is Required'
    }
    this.messageType = ''
    return ''
  }
}
```
