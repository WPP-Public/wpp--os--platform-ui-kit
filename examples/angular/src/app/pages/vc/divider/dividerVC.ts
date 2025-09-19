import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-divider',
  templateUrl: './dividerVC.html',
  styleUrls: ['./dividerVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerVC {}
