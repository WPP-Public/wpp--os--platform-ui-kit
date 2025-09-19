import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxesVC.html',
  styleUrls: ['./checkboxesVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesVC {
  public value: boolean = false
  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Option 1',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }
  public labelConfigHover = {
    text: 'Hover test',
  }
  public firstSelect = true

  public handleChange = (ev: Event) => {
    console.log('checkbox change event: ', (ev as CustomEvent).detail)

    this.firstSelect = (ev as CustomEvent).detail.checked
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
