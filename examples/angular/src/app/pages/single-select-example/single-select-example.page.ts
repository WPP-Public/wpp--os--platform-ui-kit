import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SAMPLE_LIST_2 } from './consts'

@Component({
  selector: 'app-single-select-example',
  templateUrl: './single-select-example.page.html',
  styleUrls: ['./single-select-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleSelectPage {
  public SAMPLE_LIST_2 = SAMPLE_LIST_2
  public value = ''

  handleChange(event: Event) {
    const customEvent = event as CustomEvent

    console.log('On Change single', customEvent.detail)
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
