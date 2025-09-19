import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SAMPLE_LIST_2 } from '../single-select-example/consts'

@Component({
  selector: 'app-multiple-select-example',
  templateUrl: './multiple-select-example.page.html',
  styleUrls: ['./multiple-select-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleSelectPage {
  public SAMPLE_LIST_2 = SAMPLE_LIST_2
  public value = []

  handleChange(event: Event) {
    const customEvent = event as CustomEvent

    console.log('On Change multiple', customEvent.detail)
    this.value = customEvent.detail.value
  }

  get requiredLabelConfig() {
    return {
      text: 'Size M',
      icon: 'wpp-icon-info',
      description: 'Description',
    }
  }
}
