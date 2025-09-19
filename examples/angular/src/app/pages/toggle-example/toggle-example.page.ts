import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-toggle-example',
  templateUrl: './toggle-example.page.html',
  styleUrls: ['./toggle-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleExamplePage {
  labelConfig = {
    text: 'Label Text',
  }

  labelConfigIcon = {
    icon: 'wpp-icon-info',
    text: 'Label with Icon',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  labelConfigTest = {
    text: 'Label Test',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  controlledLabelConfig = {
    text: 'Controlled Toggle',
  }
}
