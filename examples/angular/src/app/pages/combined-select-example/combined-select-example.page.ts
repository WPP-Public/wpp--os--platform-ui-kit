import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SAMPLE_LIST_COMBINED } from '../single-select-example/consts'

@Component({
  selector: 'app-combined-select-example',
  templateUrl: './combined-select-example.page.html',
  styleUrls: ['./combined-select-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedSelectPage {
  public SAMPLE_LIST_COMBINED = SAMPLE_LIST_COMBINED
  public value = ''

  handleChange(event: Event) {
    const customEvent = event as CustomEvent

    console.log('On Change combined', customEvent.detail)
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
