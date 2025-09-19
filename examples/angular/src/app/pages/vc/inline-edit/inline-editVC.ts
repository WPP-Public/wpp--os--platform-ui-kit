import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InlineEditMode } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-editVC.html',
  styleUrls: ['./inline-editVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEditVC {
  public bottomPlacement = { placement: 'bottom' }
  public bottomStartPlacement = { placement: 'bottom-start' }
  public inputMode1: InlineEditMode = 'read'
  public inputMode2: InlineEditMode = 'read'
  public textareaMode: InlineEditMode = 'read'
  public inputText1 = ''
  public inputText2 = ''
  public textareaText = 'text area value'

  handleInputModeChange1 = (event: Event) => {
    this.inputMode1 = (event as CustomEvent).detail.mode

    console.log((event as CustomEvent).detail)

    if (this.inputMode1 === 'read') {
      const customEvent = event as CustomEvent

      customEvent.detail.closePopover()
    }
  }

  handleInputModeChange2 = (event: Event) => {
    this.inputMode2 = (event as CustomEvent).detail.mode

    console.log((event as CustomEvent).detail)

    if (this.inputMode2 === 'read') {
      const customEvent = event as CustomEvent

      customEvent.detail.closePopover()
    }
  }

  handleTextareaModeChange = (event: Event) => {
    this.textareaMode = (event as CustomEvent).detail.mode

    console.log((event as CustomEvent).detail)

    if (this.textareaMode === 'read') {
      const customEvent = event as CustomEvent

      customEvent.detail.closePopover()
    }
  }

  handleInputValueChange1 = (event: Event) => {
    this.inputText1 = (event as CustomEvent).detail.value
  }

  handleInputValueChange2 = (event: Event) => {
    this.inputText2 = (event as CustomEvent).detail.value
  }

  handleTextareaValueChange = (event: Event) => {
    this.textareaText = (event as CustomEvent).detail.value
  }
}
