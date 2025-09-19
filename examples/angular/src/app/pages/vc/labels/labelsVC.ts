import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-label',
  templateUrl: './labelsVC.html',
  styleUrls: ['./labelsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsVC {
  public regularLabelConfig = {
    icon: 'wpp-icon-info',
    text: 'Label with info icon',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }
  public accentedLabelConfig = {
    icon: 'wpp-icon-info',
    text: 'Accent Label with info icon',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }
}
