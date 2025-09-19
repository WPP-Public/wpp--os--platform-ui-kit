import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CUSTOM_LIST, message, LIST } from './consts'

@Component({
  selector: 'app-select-single-example',
  templateUrl: './selects-singleVC.html',
  styleUrls: ['./selects-singleVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectsSingleVC {
  public message = message
  public LIST = LIST
  public CUSTOM_LIST = CUSTOM_LIST
  public selectValue = ''
  public customValue = ''
  public selectWithItemsLabelConfig = {
    icon: 'wpp-icon-info',
    text: 'Single Select With Items and left Icon',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleChange = (event: Event) => {
    const detail = (event as CustomEvent).detail

    console.log('value :>> ', detail)
  }

  public handleChangeSelect = (event: Event) => {
    const customEvent = event as CustomEvent

    this.selectValue = customEvent.detail.value
  }

  public handleChangeCustom = (event: Event) => {
    const customEvent = event as CustomEvent

    this.customValue = customEvent.detail.value
  }
}
