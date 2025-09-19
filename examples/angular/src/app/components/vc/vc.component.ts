import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-main',
  templateUrl: './vc.component.html',
  styleUrls: ['./vc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VCComponent {}
