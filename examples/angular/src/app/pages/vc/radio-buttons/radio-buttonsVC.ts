import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-radio-button-example',
  templateUrl: './radio-buttonsVC.html',
  styleUrls: ['./radio-buttonsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonsVC {
  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Option 2',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
