import { ChangeDetectionStrategy, Component } from '@angular/core'
import { WppInputCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import { InputChangeEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'decimal-input',
  templateUrl: './decimalInput.html',
  styleUrls: ['./decimalInput.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecimalInput {
  public value: string | null = null
  public inputValues: string = undefined
  public inputRef: HTMLWppInputElement = null

  public validateLength = (event: Event) => {
    this.inputValues = (event as WppInputCustomEvent<InputChangeEventDetail>).detail.value
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
