import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SAMPLE_LIST_2 } from '../single-select-example/consts'

@Component({
  selector: 'app-text-select-example',
  templateUrl: './text-select-example.page.html',
  styleUrls: ['./text-select-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSelectPage {
  public SAMPLE_LIST_2 = SAMPLE_LIST_2
  public value = ''

  handleChange(event: Event) {
    const customEvent = event as CustomEvent

    console.log('On Change text', customEvent.detail)
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
