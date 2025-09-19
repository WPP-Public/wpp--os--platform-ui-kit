import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SAMPLE_LIST_COMBINED } from '../../single-select-example/consts'

@Component({
  selector: 'app-select-combined-example',
  templateUrl: './selects-combinedVC.html',
  styleUrls: ['./selects-combinedVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectsCombinedVC {
  public value: string = 'usd'
  public inputValue: string = '100'
  public LIST = SAMPLE_LIST_COMBINED

  public handleWppChange = (event: Event) => {
    const { value: newValue, inputValue: newInputValue } = (event as CustomEvent).detail

    this.value = newValue
    this.inputValue = newInputValue
    console.log('WppChange event:', newValue, newInputValue)
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
