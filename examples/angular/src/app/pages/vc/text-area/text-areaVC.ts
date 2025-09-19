import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-textarea-input',
  templateUrl: './text-areaVC.html',
  styleUrls: ['./text-areaVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaVC {
  public messageText =
    'Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the long'

  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Regular Text Area with Limit',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
