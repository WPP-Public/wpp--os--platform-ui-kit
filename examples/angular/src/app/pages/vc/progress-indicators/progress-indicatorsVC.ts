import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-progress-indicator-example',
  templateUrl: './progress-indicatorsVC.html',
  styleUrls: ['./progress-indicatorsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressIndicatorsVC {}
